import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import { validate } from 'class-validator';
import config from '../config';
import * as nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'maique.rosa@gmail.com', // generated ethereal user
    pass: 'zbgreueoequkohcw' // generated ethereal password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});

class UserController {
  static listAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({ select: ['id', 'username', 'name', 'role', 'email'] });

    res.status(200).send(users);
  };

  static getOneBId = async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail(id, { select: ['id', 'username', 'name', 'role', 'email'] });
    } catch (error) {
      res.status(404).send({ error: { code: 404, message: 'Usuario não encontrado' } });
    }

    res.status(200).send(user);
  };

  static newUser = async (req: Request, res: Response) => {
    let { username, password, name, role, email } = req.body;
    let user = new User();
    user.username = username || email;
    user.name = name;
    user.email = email;
    user.role = role;
    user.password = password || '4ward1234';

    const errors = await validate(user);

    if (errors.length > 0) {
      res.status(400).send({ code: 400, message: 'Existem dados inválidos', errors });
      return;
    }
    user.hashPassword();

    const userRepository = getRepository(User);

    try {
      user = await userRepository.save(user);
    } catch (error) {
      res.status(409).send({ code: 409, message: 'Login já existe na base de dados' });
      return;
    }

    const token = jwt.sign({ userId: user.id, name: user.name, username: user.username, email: user.email }, config.resetPasswordKey, {
      expiresIn: '10m'
    });

    try {
      await transporter.sendMail({
        from: 'maique.rosa@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: `Olá segue seu link para alterar sua senha: http://localhost:4200/#/password-activation/${token}`, // plain text body
        html: `<h1>Alteração de Senha</h1>
          <p>Altere sua senha acessando o link abaixo</p>
          <a target="_blank" href="http://localhost:4200/#/password-activation/${token}">Alterar meu Password</a>
        ` // html body
      });
    } catch (error) {
      return res.status(400).send({ error: { code: 400, message: 'Não foi possivel enviar o email' } });
    }

    res.status(200).send({ message: 'Usuário cadastrado com sucesso' });
  };

  static editUser = async (req: Request, res: Response) => {
    let { id, name, role, email } = req.body;

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send({ error: { code: 404, message: 'Usuário não encontrado' } });
      return;
    }

    user.name = name;
    user.email = email;
    user.username = email;
    user.role = role;

    const errors = await validate(user);

    if (errors.length > 0) {
      res.status(400).send({ error: { code: 400, message: 'Existem dados inválidos', errors } });
      return;
    }

    try {
      await userRepository.save(user);
    } catch (error) {
      res.status(409).send({ code: 409, message: 'Login já existe na base de dados', error });
      return;
    }

    res.status(200).send({ message: 'Usuário atualizado com sucesso' });
  };

  static deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
   
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(200).send({ message: 'Usuário excluido com sucesso' });
  };

  static requestNewPassword = async (req: Request, res: Response) => {
    const userEmail = req.query.email;
    const userRepository = getRepository(User);

    let user: User;

    try {
      user = await userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email: userEmail })
        .getOne();
    } catch (error) {
      return res.status(404).send({ error: { code: 404, message: 'Usuário não encontrado' } });
    }

    const token = jwt.sign({ userId: user.id, name: user.name, username: user.username, email: user.email }, config.resetPasswordKey, {
      expiresIn: '10m'
    });

    let info: any;
    try {
      info = await transporter.sendMail({
        from: 'maique.rosa@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: `Olá segue seu link para alterar sua senha: http://localhost:4200/#/password-activation/${token}`, // plain text body
        html: `<h1>Alteração de Senha</h1>
          <p>Altere sua senha acessando o link abaixo</p>
          <a target="_blank" href="http://localhost:4200/#/password-activation/${token}">Alterar meu Password</a>
        ` // html body
      });
    } catch (error) {
      return res.status(400).send({ error: { code: 400, message: 'Não foi possivel enviar o email' } });
    }

    return res.status(200).send({ error: { code: 200, message: 'Email enviado para: ' + userEmail, log: info } });
  };

  static resetPassword = async (req: Request, res: Response) => {
    const token = req.params.token;
    const { newPassword } = req.body;
    let payload: any;

    if (!newPassword) {
      return res.status(400).send({ code: 400, message: 'Nova senha não foi enviada' });
    }

    try {
      payload = jwt.verify(token, config.resetPasswordKey);
    } catch (error) {
      return res.status(400).send({ code: 400, message: 'Link expirado ou inválido' });
    }

    const userRepository = getRepository(User);
    const userId = payload.userId;

    let user: User;

    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (error) {
      return res.status(401).send({ code: 401, message: 'Token informado é inválido' });
    }

    try {
      user.password = newPassword;
      user.hashPassword();
      userRepository.save(user);
    } catch (error) {
      return res.status(400).send({ code: 400, message: 'Existem dados invalidos neste usuário', log: error });
    }

    return res.status(200).send({ message: 'Password Atualizado com sucesso' });
  };
}

export default UserController;
