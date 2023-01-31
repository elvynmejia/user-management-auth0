import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Router, Request, Response } from 'express';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import morgan from 'morgan';
import cors from 'cors';

const app: Express = express();
const router: Router = Router();

const checkJwt = auth();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));
app.use(express.urlencoded({ extended: false }));

app.post('/api/v1/auth0test', checkJwt, (req: Request, res: Response) => {
  res.status(200).json({ endpoint: '/api/v1/auth0test' });
});

export default app;
