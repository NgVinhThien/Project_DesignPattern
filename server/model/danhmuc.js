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
    connection.query("SELECT * FROM danh_muc_xe JOIN xe ON danh_muc_xe.id = xe.id_danh_muc_xe WHERE danh_muc_xe.id = ?",id ,function(err,danhmuc){
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