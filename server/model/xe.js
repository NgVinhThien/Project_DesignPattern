import connection from '../common/connect.js';

const xe = function(xe){
    this.id= xe.id;
    this.ten_xe= xe.ten_xe;
    this.gia= xe.gia;
    this.id_hang_xe= xe.id_hang_xe;
    this.id_danh_muc_xe= xe.id_danh_muc_xe;
    this.mota = xe.mota;
    this.mau = xe.mau;
}
xe.getAll= function(result){
    connection.query("select id,ten_xe,gia,mau from xe", (err, results)=>{
        if(err) throw err; 
        result(results);
    });
    
}
export default xe;