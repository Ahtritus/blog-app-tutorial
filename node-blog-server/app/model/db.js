import mysql from "mysql";
import dbConfig from "../config/db.config";

//creating connection for mysql
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  databse: dbConfig.database,
});

//connecting to database
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql Connected...");
});

module.export = connection;
