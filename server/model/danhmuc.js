import connection from '../common/connect.js';

const danhmuc= function(danhmuc){
    this.id= danhmuc.id;
    this.ten_danh_muc= danhmuc.ten_danh_muc;
    this.anh_dai_dien= danhmuc.anh_dai_dien;
}
danhmuc.getAll= function(result){
    connection.query("select * from danh_muc_xe", (err, results)=>{
        if(err) throw err; 
        result(results);
    });
    
}
export default danhmuc;