// import { ONE_WEEK } from './../config/index'
import { ssrMiddleware } from 'quasar/wrappers';
// import session from 'express-session'
import { con } from '../db';
// import express from 'express'
let hasSession = null;

export default ssrMiddleware(async ({ app }) => {
  app.use(async (req, res, next) => {
    const // @ts-expect-error missing types
      currentSessionID = req.sessionID,
      query = `SELECT * FROM sessions WHERE session_id = "${currentSessionID}"`,
      [session] = await con.query(query);
    hasSession = session.length ? session[0] : null;
    console.log(hasSession);
    next();
    // .then(([row]) => {
    //   const RawSession = row[0]
    //   let session = null
    //   if (RawSession !== undefined) {
    //     console.log(row[0])
    //     session = JSON.parse(RawSession.data)

    //     // @ts-expect-error missing types
    //     if (session && req.session.customer) {
    //       const storeSessionID = RawSession.session_id,
    //         { customer, CToken } = session,
    //         storeUID = customer.uid.toLowerCase(),
    //         // @ts-expect-error missing types
    //         currentUID = req.session.customer.uid.toLowerCase()
    //       if (storeSessionID === currentSessionID && storeUID === currentUID) {
    //       // @ts-expect-error missing types
    //         req.session.customer = customer
    //         // @ts-expect-error missing types
    //         req.session.CToken = CToken
    //       }
    //     } else {
    //     // // @ts-expect-error missing types
    //     //   delete req.session.customer
    //     //   delete req.session.CToken
    //     }
    //   }
    //   console.log(RawSession)
    //   next()
    // }).catch(next)
  });
  // app.use(function (req, res, next) {
  //   res.header('Access-Control-Allow-Origin', '*')
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  //   // @ts-expect-error missing types
  //   res.setHeader('Access-Control-Allow-Credentials', true)
  //   next()
  // })
  // app.use('/', (req, res, next) => next())
});
