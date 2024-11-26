import { Request, Response } from 'express';
import User from '../db/models/user';
import dotenv from 'dotenv';
import { hashPass, passwordIsMatch } from '../utils/password';
import { errorGenerate, responseData } from '../utils/responseData';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import tokenHandling from '../middleware/JWT/tokenHandling';
dotenv.config();

const register = async (req: Request, res: Response): Promise<Response> => {
 try {
  const { name, email, password, phoneNumber, role } = req.body;
  const hashed = await hashPass(password);
  const user = await User.create({
   name,
   email,
   password: hashed,
   phoneNumber,
   role: role || 'customer',
  });

  const { password: p, ...data } = user.dataValues;

  return res.status(201).send(responseData('success', 'Registration successful', { user: data }, null));
 } catch (error: any) {
  return res.status(500).send(responseData('error', 'Internal Server Error', null, errorGenerate()));
 }
};

const login = async (req: Request, res: Response): Promise<Response> => {
 try {
  const { email, password } = req.body;
  const currentUser = await User.findOne({
   raw: true,
   where: { email: email },
  });
  if (!currentUser) {
   const errors = errorGenerate(404, 'Email does not exist');
   return res.status(404).send(responseData('error', 'Not Found', null, errors));
  }
  if (!(await passwordIsMatch(password, currentUser.password))) {
   const errors = errorGenerate(401, 'Wrong password');
   return res.status(401).send(responseData('error', 'Unauthorized', null, errors));
  }
  const { password: p, ...data } = currentUser;
  return res.status(201).send(responseData('success', 'Ok', { currentUser: data }, null));
 } catch (error) {
  return res.status(500).send(responseData('error', 'Internal Server Error', null, errorGenerate()));
 }
};

const forgotPassword = async (req: Request, res: Response): Promise<Response> => {
 try {
  const { email } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (!user) {
   const errors = errorGenerate(404, 'Email does not exist');
   return res.status(404).send(responseData('error', 'Not Found', null, errors));
  }
  const token = tokenHandling.generateToken({ email }, '180s');

  const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
   },
  });
  const resetPasswordLink = `${req.headers.referer}reset-password/${token}`;
  const mailOptions = {
   from: process.env.EMAIL_ADDRESS,
   to: user.email,
   subject: 'Password reset',
   html: `
        <div>You are receiving this because you (or someone else) have requested the reset of the password for your account.</div>
        <div>To complete the process, please click <a href=${resetPasswordLink}>Reset password</a></div>
        <div>The link is valid for 5 minutes.</div>
        <div>If you did not request this, please ignore this email and your password will remain unchanged.</div>
        <hr/>
        `,
  };
  const info = await transporter.sendMail(mailOptions);
  if (info.response)
   return res.status(201).send(responseData('success', `Password reset email has been sent successfully.`, null, null));

  return res
   .status(500)
   .send(responseData('error', 'Internal Server Error', null, errorGenerate(500, 'Failed to send email')));
 } catch (error) {
  console.log(error);

  return res.status(500).send(responseData('error', 'Internal Server Error', null, errorGenerate()));
 }
};

const resetPassword = async (req: Request, res: Response): Promise<Response> => {
 try {
  const { password, user } = req.body;
  const passwordHashed = await hashPass(password);
  const data = { password: passwordHashed };
  user.update(data);
  await user.save();
  return res.status(201).send(responseData('success', 'Reset Password successfully', null, null));
 } catch (error: any) {
  console.log(error);

  return res.status(500).send(responseData('error', 'Internal Server Error', null, errorGenerate()));
 }
};

export default { register, login, forgotPassword, resetPassword };
