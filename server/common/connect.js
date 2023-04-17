import mysql from 'mysql';

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "QLBanXe"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
export default connection;