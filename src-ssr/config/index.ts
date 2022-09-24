import jwt from 'jsonwebtoken';
import { jwtSecret as secret } from '../db';
export const sess = (app: { get: (arg0: string) => string }) => {
  return {
    name: 'session',
    secret: 'our-love-is-our-secret-key',
    resave: false,
    // store: sessionStore,
    saveUninitialized: false,
    cookie: {
      maxAge: 120000,
      expires: 5 * 60 * 1000,
      secure: app.get('env') === 'production',
      httpOnly: false,
    },
  };
};

export function ONE_WEEK() {
  return 60 * 60 * 24 * 7;
}
export function jwtSignUser(customer: { uid: string }) {
  return jwt.sign({ uid: customer.uid }, secret, { expiresIn: ONE_WEEK() });
}
