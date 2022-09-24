import { con } from '../../db';
import type { Request, Response } from 'express';

export async function duplicateUser(
  req: Request,
  res: Response,
  next: () => void
) {
  try {
    // console.log(req.body)
    const { customerData } = req.body,
      query = `SELECT * FROM customers WHERE
        email = "${escape(customerData.email.toString())}" OR
        phoneNumber = "${customerData.phoneNumber}"
      `,
      [rows] = await con.query(query);
    // @ts-expect-error missing types
    if (rows.length > 0) {
      const { email, phoneNumber } = rows[0],
        hasEmail = email === customerData.email,
        msg = `<div>
          An account has been associated with your ${
            hasEmail ? 'email addresss' : 'phone number'
          }: 
          <em>${
            hasEmail ? email : phoneNumber
          }.</em> Please contact<b> iNeeds </b> to reset your password
        </div>`;
      return res.status(409).send({
        msg,
      });
    }
    next();
    // })
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      msg: 'There is something wrong with the server!',
    });
  }
}
