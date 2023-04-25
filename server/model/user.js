import connection from '../common/connect.js';

const user= function(user){
    this.id= user.id;
    this.ho_ten= user.ho_ten;
    this.dia_chi= user.dia_chi;
    this.sdt= user.sdt;
    this.email= user.email;
    this.username= user.username;
    this.password= user.password;
}
user.signIn= function(data, result){
    connection.query("select * from khach_hang where username=? and upassword=?", [data.username, data.upassword], (err, results)=>{
        if(err) throw err; 
        result(results);
    });
}
user.signUp = function(data, result) {
  connection.query(
    'INSERT INTO khach_hang SET ?',
    data,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
export default user;
