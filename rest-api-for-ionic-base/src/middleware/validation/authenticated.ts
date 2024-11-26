import { NextFunction, Request, Response } from 'express';
import { errorGenerate, responseData } from '../../utils/responseData';
import tokenHandling from '../JWT/tokenHandling';

const authenticated = (req: Request, res: Response, next: NextFunction) => {
 try {
  const authToken = req.headers['authorization'];
  const token = authToken && authToken.split(' ')[1];

  if (!token) {
   const errors = errorGenerate(401, 'None-token');
   return res.status(401).send(responseData('error', 'Unauthorized', null, errors));
  }

  const result = tokenHandling.extractToken(token!);

  if (!result) {
   const errors = errorGenerate(401, 'Token invalid or expired ');
   return res.status(401).send(responseData('error', 'Unauthorized', null, errors));
  }

  res.locals.userEmail = result?.email;
  res.locals.role = result?.role;

  next();
 } catch (err: any) {
  return res.status(500).send(responseData('error', 'Internal Server Error', null, errorGenerate()));
 }
};

export default authenticated;
