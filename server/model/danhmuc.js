import connection from '../common/connect.js';

const danhmuc= function(danhmuc){
    this.id= danhmuc.id;
    this.ten_danh_muc= danhmuc.ten_danh_muc;
    this.anh_dai_dien= danhmuc.anh_dai_dien;
    this.ten_xe= danhmuc.ten_xe;
    this.gia= danhmuc.gia;
    this.id_danh_muc_xe= danhmuc.id_danh_muc_xe;
}
danhmuc.getAll= function(result){
    connection.query("select * from danh_muc_xe", (err, results)=>{
        if(err) throw err; 
        result(results);
    });
}
danhmuc.getAllIdDanhMuc= function(id,result){
    console.log(id);
    connection.query("SELECT xe.id, xe.ten_xe, xe.gia, xe.mau, anh_xe.lien_ket_anh FROM xe JOIN danh_muc_xe ON xe.id_danh_muc_xe = danh_muc_xe.id JOIN ( SELECT id_xe, lien_ket_anh FROM anh_xe GROUP BY id_xe ) AS anh_xe ON xe.id = anh_xe.id_xe WHERE danh_muc_xe.id = ?",id ,function(err,danhmuc){
        console.log(err,danhmuc)
        if(err)
        {
            result(null);
        }else{
            result(danhmuc);
        }
    });
    
}
export default danhmuc;