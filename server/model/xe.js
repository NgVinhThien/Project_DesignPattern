import connection from '../common/connect.js';

const xe = function(xe){
    this.id= xe.id;
    this.ten_xe= xe.ten_xe;
    this.gia= xe.gia;
    this.id_hang_xe= xe.id_hang_xe;
    this.id_danh_muc_xe= xe.id_danh_muc_xe;
    this.mota = xe.mota;
    this.mau = xe.mau;
    this.loai_uu_dai = xe.loai_uu_dai;
    this.gia_uu_dai = xe.gia_uu_dai;
}
xe.getAll= function(result){
    connection.query("SELECT xe.*, anh_xe.lien_ket_anh FROM xe LEFT JOIN ( SELECT id_xe, lien_ket_anh FROM anh_xe GROUP BY id_xe ) AS anh_xe ON xe.id = anh_xe.id_xe", (err, results)=>{
        if(err) throw err; 
        result(results);
    });
}
xe.getDetailXeById= function(id_xe, result){
    // console.log(">>>Check id xe in model", id_xe);
    connection.query("SELECT xe.*, anh_xe.lien_ket_anh FROM xe LEFT JOIN ( SELECT id_xe, lien_ket_anh FROM anh_xe GROUP BY id_xe, lien_ket_anh) AS anh_xe ON xe.id = anh_xe.id_xe  where xe.id=? limit 1", id_xe, (err, results)=>{
        if(err) throw err; 
        result(results);
    });
}
xe.add= function(data, result){
    connection.query(
        'insert into xe (ten_xe, gia, id_hang_xe, id_danh_muc_xe, mota, mau, loai_uu_dai, gia_uu_dai) value (?, ?, ?, ?, ?, ?, ?, ?)',
        [data.ten_xe, data.gia, data.id_hang_xe, data.id_danh_muc_xe, data.mota, null, data.loai_uu_dai, data.gia_uu_dai],
        (err, results) => {
          if(err) throw err;
          console.log(results);
          result(results);
        })
}
export default xe;