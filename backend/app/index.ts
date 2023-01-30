import dotenv from 'dotenv';

dotenv.config();

import express, { Express, Router, Request, Response } from 'express';
import morgan from 'morgan';

const app: Express = express();
const router: Router = Router();

app.use(express.json());
app.use(morgan('common'));
app.use(express.urlencoded({ extended: false }));

app.post('/api/v1/auth0test', (req: Request, res: Response) => {
  res.send({ user: {
    userId: 1,
    email: '8f-example.com',
    token: 'some-random-token-generated-upon-signup'
  }});
});

export default app;
