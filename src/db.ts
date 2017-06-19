import {dbadapter} from 'tsdbadapter';
import * as tsmongo from 'tsmongo'; // required to infer type
import * as tsmysql from 'tsmysql'; // required to infer type
const db = require('../properties/local.properties').db;

export function database () {
  return dbadapter(db);
};
