import { NextFunction, Request, Response } from 'express';
import Validator from 'validatorjs';
import User from '../../db/models/user';
import { errorGenerate, responseData } from '../../utils/responseData';

const registerValidation = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const { name, email, password, confirmPassword } = req.body;
  const data = { name, email, password, confirmPassword };
  const rules: Validator.Rules = {
   name: 'required|string|max:50',
   email: 'required|email',
   password: 'required|min:6',
   confirmPassword: 'required|same:password',
  };
  const validate = new Validator(data, rules);

  if (validate.fails()) {
   const errors = Object.entries(validate.errors.errors)
    .map(([field, messages]) => {
     return messages.map((message) => message);
    })
    .flat();

   return res.status(400).send(responseData('error', 'Bad Request', null, errorGenerate(400, errors)));
  }
  const user = await User.findOne({ where: { email: data.email } });
  if (user) {
   const errors = errorGenerate(409, 'Email already used');
   return res.status(409).send(responseData('error', 'Conflict', null, errors));
  }
  next();
 } catch (error) {
  return res.status(500).send(responseData('error', 'Internal Server Error', null, errorGenerate()));
 }
};

const resetPasswordValidation = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const { password, confirmPassword } = req.body;
  const data = { password, confirmPassword };

  const rules: Validator.Rules = {
   password: 'required|min:6',
   confirmPassword: 'required|same:password',
  };
  const validate = new Validator(data, rules);

  if (validate.fails()) {
   const errors = Object.entries(validate.errors.errors)
    .map(([field, messages]) => {
     return messages.map((message) => message);
    })
    .flat();

   return res.status(400).send(responseData('error', 'Bad Request', null, errorGenerate(400, errors)));
  }

  const email = res.locals.userEmail;
  const user = await User.findOne({ where: { email } });
  if (!user) {
   const errors = errorGenerate(409, 'User does not exist');
   return res.status(404).send(responseData('error', 'Not found', null, errors));
  }
  req.body = { ...data, email, user };
  next();
 } catch (error: any) {
  console.log(error);

  return res.status(500).send(responseData('error', 'Internal Server Error', null, errorGenerate()));
 }
};

export default { registerValidation, resetPasswordValidation };
