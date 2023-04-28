import connection from '../common/connect.js';
import bcrypt from 'bcrypt';
const user= function(user){
    this.id= user.id;
    this.ho_ten= user.ho_ten;
    this.dia_chi= user.dia_chi;
    this.sdt= user.sdt;
    this.email= user.email;
    this.username= user.username;
    this.password= user.password;
}
const saltRounds= 10;
const salt= bcrypt.genSaltSync(saltRounds);
user.signIn= function(data, result){
    connection.query("select * from khach_hang where email=? ", [data.email], (err, results)=>{
        if(err) throw err;
        const isValidPassword= bcrypt.compareSync(data.password, results[0]['password']);
        if( isValidPassword){
          result(results);
        }
        else{
          result(false);
        }
        
    });
}
user.findUser= function(data, result){
  connection.query('select * from khach_hang where email= ?', [data.email],
  (err, resdata)=>{
    if(err) throw err;
    result(resdata);
  })
}
user.signUp = function(data, result) {
 
  const passwordHashed= bcrypt.hashSync(data.password, salt);

  connection.query(
    'insert into khach_hang (ho_ten, dia_chi, sdt, email, username, password) value (?, ?, ?, ?, ?, ?) ',
    [data.ho_ten, data.dia_chi, data.sdt, data.email, data.username, passwordHashed],
    (err, results) => {
      if(err) throw err;
      result(results);

      // if (err) {
      //   result(err, null);
      // } else {
      //   result(null, res);
      // }
    }
  );
};
export default user;

