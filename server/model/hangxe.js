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
    connection.query("SELECT xe.id, xe.ten_xe, xe.gia, xe.mau, anh_xe.lien_ket_anh  FROM xe JOIN hang_xe ON xe.id_hang_xe = hang_xe.id  JOIN ( SELECT id_xe, lien_ket_anh  FROM anh_xe  GROUP BY id_xe) AS anh_xe ON xe.id = anh_xe.id_xe WHERE hang_xe.id = ?",id ,function(err,hangxe){
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