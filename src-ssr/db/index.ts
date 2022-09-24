import mysql from 'mysql2';
import MySQLStore from 'express-mysql-session';
import bluebird from 'bluebird';
const sessionOption = {
    host: '127.0.0.1',
    user: 'folamy',
    password: 'OUTlook@123',
    database: 'inidzdb',
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
    host: '127.0.0.1',
    user: 'folamy',
    password: 'OUTlook@123',
    database: 'inidzdb',
    insecureAuth: true,
    Promise: bluebird,
  },
  pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'folamy',
    password: 'OUTlook@123',
    database: 'inidzdb',
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
