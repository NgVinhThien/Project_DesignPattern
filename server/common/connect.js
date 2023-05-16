import mysql from 'mysql';

var connection = mysql.createConnection({
  host: "brcqbyhqtad5pdyqakqn-mysql.services.clever-cloud.com",
  user: "u6qqbf6dz9fzwj2z",
  password: "biGVAjyJ1GR4IhNpFeb9",
  database: "brcqbyhqtad5pdyqakqn"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
export default connection;