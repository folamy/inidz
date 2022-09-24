import { emailPhone } from './../../config/utils';
import { con } from '../../db';
import { uid } from 'quasar';
import { jwtSignUser } from '../../config';
// import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { customerData } = req.body,
      addQuery = 'INSERT INTO customers SET ?',
      customerUid = uid(),
      justRegistered = `SELECT * FROM customers WHERE uid = "${customerUid}"`,
      salt = bcrypt.genSaltSync(10);
    customerData.uid = customerUid;
    customerData.password = bcrypt.hashSync(
      customerData.password.toLowerCase(),
      salt
    );
    await con.query(addQuery, customerData).then(async () => {
      const [rows] = await con.query(justRegistered),
        customer = rows[0],
        CToken = jwtSignUser(rows[0]);

      req.session.customer = customer;
      req.session.CToken = CToken;
      res.json({
        customer,
        CToken,
      });
    });
  } catch (error) {
    res.send(error);
  }
};

export async function login(req, res) {
  try {
    // const query = `SELECT * FROM students`,
    //   [rows] = await conn.query(query)
    const { loginData } = req.body,
      { email, query } = await emailPhone(loginData.emailNum);
    con.query(query).then(async ([rows]) => {
      const customer = rows[0];
      // @ts-expect-error missing types
      if (!rows.length) {
        return res.status(404).send({
          msg: `<div>${email ? 'Email Address' : 'Phone Number'}: <em>${
            loginData.emailNum
          }</em> was not found! Are sure you have registered?</div>`,
        });
      } else {
        if (
          !bcrypt.compareSync(
            loginData.password.toLowerCase(),
            customer.password
          )
        ) {
          return res.status(401).send({
            msg: '<div>Invalid password! If you forget your password, click on forgot password to reset password</div>',
          });
        }
        const CToken = jwtSignUser(rows[0]);

        req.session.customer = customer;
        req.session.CToken = CToken;
        res.json({
          customer,
          CToken,
        });
      }
    });
  } catch (error) {
    res.send(error);
  }
}
export async function logout(req, res) {
  req.session.destroy();
  res.send({
    logoutMsg: 'logout successful',
  });
}
