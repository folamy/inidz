import mysql from 'mysql2';
import MySQLStore from 'express-mysql-session';
import bluebird from 'bluebird';
const sessionOption = {
    host: process.env.NODE_ENV === 'production' ? 'inidzdb' : '127.0.0.1',
    user: process.env.NODE_ENV === 'production' ? 'folamy' : 'root',
    password: 'OUTlook@123',
    database: process.env.NODE_ENV === 'production' ? 'inidzdb' : 'inidz',
    insecureAuth: true,
    schema: {
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  },
  conParams = {
    host: process.env.NODE_ENV === 'production' ? 'inidzdb' : '127.0.0.1',
    user: process.env.NODE_ENV === 'production' ? 'folamy' : 'root',
    password: 'OUTlook@123',
    database: process.env.NODE_ENV === 'production' ? 'inidzdb' : 'inidz',
    insecureAuth: true,
    Promise: bluebird,
  },
  pool = mysql.createPool({
    host: process.env.NODE_ENV === 'production' ? 'inidzdb' : '127.0.0.1',
    user: process.env.NODE_ENV === 'production' ? 'folamy' : 'root',
    password: 'OUTlook@123',
    database: process.env.NODE_ENV === 'production' ? 'inidzdb' : 'inidz',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    insecureAuth: true,
    // Promise: bluebird
  }),
  jwtSecret = 'GodisAlwaysAble',
  con = pool.promise(),
  sessionStore = new MySQLStore(sessionOption);
export { mysql, conParams, jwtSecret, con, sessionStore };
