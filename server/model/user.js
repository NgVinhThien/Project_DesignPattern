import connection from '../common/connect.js';

const user= function(user){
    // this.id= user.id;
    this.ho_ten= user.ho_ten;
    this.dia_chi= user.dia_chi;
    this.sdt= user.sdt;
    this.email= user.email;
    this.username= user.username;
    this.password= user.password;
}
user.signUp= function(data, result){
    connection.query("insert into khach_hang SET?", data, (err, results)=>{
        if(err) throw err; 
        result(results);
    });
}

export default user;