import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import * as randtoken from 'rand-token';
import { User } from '../entity/User';
import config from '../config';

let refreshTokens = {};

class AuthController {
  static login = async (req: Request, res: Response) => {
    let { username, grant_type, password } = req.body;
    if (!(username && password)) {
      res.status(400).send({ code: 400, message: 'Informe Login e Password' });
      return;
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send({ code: 401, message: 'Login ou Password inválido' });
      return;
    }

    if (!user.checkIfUnecryptedPasswordIsValid(password)) {
      res.status(401).send({ code: 401, message: 'Login ou Password inválido' });
      return;
    }

    const profiles = [
      { profile: 'financeiro', jurisdictions: ['all_access'] },
      { profile: 'administrativo', jurisdictions: ['all_access'] }
    ];

    const profies = user.email.includes('admin')
      ? [{ profile: 'administrativo', jurisdictions: ['all_access'] }]
      : user.email.includes('maique')
      ? [{ profile: 'financeiro', jurisdictions: ['all_access'] }]
      : profiles;

    const token = jwt.sign(
      { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role, profiles: profies },
      config.jwtSecret,
      {
        expiresIn: '1h'
      }
    );
    const refreshToken = randtoken.uid(256);
    refreshTokens[refreshToken] = username;
    res.status(200).send({
      access_token: token,
      refresh_token: refreshToken,
      expires_in: 300
    });
  };
}

export default AuthController;
