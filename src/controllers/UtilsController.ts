import { Request, Response } from 'express';
import * as nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'atendimento@4ward.com.br', // generated ethereal user
    pass: 'Sar81370' // generated ethereal password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});

class UtilsController {
  static sendEmail = async (req: Request, res: Response) => {
    let { yourName, yourEmail, yourSubject, yourMessage } = req.body;

    try {
      await transporter.sendMail({
        to: 'atendimento@4ward.com.br', // list of receivers
        subject: yourSubject, // Subject line
        text: yourMessage,
        html: `<h1>Enviado atráves do Fale conosco no Porta 4Ward</h1>
                <table style="border:none" border="0">
                    <tr>
                        <td><strong>Nome do Contato: </strong></td>
                        <td>${yourName}</td>
                    </tr>

                    <tr>
                        <td><strong>Email do Contato: </strong></td>
                        <td>${yourEmail}</td>
                    </tr>
                </table>
                <br />
                <br />
                <h3>Mensagem</h3>
                <p>${yourMessage}</p>
          ` // html body
      });
    } catch (error) {
      return res.status(400).send({ code: 400, message: 'Não foi possivel enviar o email', log: error });
    }

    res.status(200).send({ message: 'Agradecemos a mensagem, entraremos em contato em breve.' });
  };
}

export default UtilsController;
