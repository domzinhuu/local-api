import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import routes from './routes';
import * as dotenv from 'dotenv';

createConnection()
  .then(async connection => {
    const app = express();
    dotenv.config();
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/', routes);
    const port = process.env.PORT || 8081;

    app.listen(port, () => {
      console.log('Express server has started on port ' + port + '.');
    });
  })
  .catch(error => console.log(error));
