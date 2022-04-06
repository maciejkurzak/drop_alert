import mongoose from 'mongoose';
import { debug, error } from './chalkFunctions.js';

const { connection } = mongoose;

const dbConn = () => {
  connection.on('connected', () => {
    debug('Mongoose connected to DB Cluster');
  });

  connection.on('error', (err) => {
    error(err.message);
  });

  connection.on('disconnected', () => {
    debug('Mongoose Disconnected');
  });

  process.on('SIGINT', () => {
    connection.close(() => {
      debug('Mongoose connection closed on Application Timeout');
      process.exit(0);
    });
  });
};

export default dbConn;
