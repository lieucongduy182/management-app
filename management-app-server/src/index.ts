import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import router from './routes';

// CONFIGURATION
dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ROUTES
app.use('', router);

// test error
app.get('/error', (req: Request, res: Response) => {
  throw new Error('This is a test error');
});
// ERROR HANDLING
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error: any, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    stack: process.env.NODE_ENV === 'development' ? error.stack : null,
    message: error.message || 'Internal Server Error',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
