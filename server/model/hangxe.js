import connection from '../common/connect.js';

const hangxe= function(hangxe){
    this.id= hangxe.id;
    this.ten_hang_xe= hangxe.ten_hang_xe;
    this.logo= hangxe.logo;
    this.ten_xe= hangxe.ten_xe;
    this.gia= hangxe.gia;
    this.id_danh_muc_xe= hangxe.id_danh_muc_xe;
}
hangxe.getAll= function(result){
    connection.query("select * from hang_xe", (err, results)=>{
        if(err) throw err; 
        result(results);
    });
    
}
hangxe.getAllIdHangXe= function(id,result){
    connection.query("SELECT xe.id,ten_xe,gia,mau FROM hang_xe JOIN xe ON hang_xe.id = xe.id_hang_xe WHERE hang_xe.id = ?",id ,function(err,hangxe){
        console.log(err,hangxe)
        if(err)
        {
            result(null);
        }else{
            result(hangxe);
        }
    });
    
}
export default hangxe;