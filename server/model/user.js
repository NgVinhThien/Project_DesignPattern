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
    connection.query("select * from khach_hang where username=? and password=?", [data.username, data.password], (err, results)=>{
        if(err) throw err; 
        result(results);
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
  connection.query(
    'insert into khach_hang (ho_ten, dia_chi, sdt, email, username, password) value (?, ?, ?, ?, ?, ?) ',
    [data.ho_ten, data.dia_chi, data.sdt, data.email, data.username, data.password],
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

