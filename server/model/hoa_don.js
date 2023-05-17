import connection from "../common/connect.js";


const hoa_don=function(hoa_don){
    this.id= hoa_don.id;
    this.id_khach_hang= hoa_don.id_khach_hang;
    this.id_xe= hoa_don.id_xe;
    this.ngay_dat= hoa_don.ngay_dat;
    this.ngay_nhan= hoa_don.ngay_nhan;
}

hoa_don.getAllHD= function(id_kh,result){
    connection.query("select * from hoa_don where id_khach_hang= ?", id_kh, (err, resdata)=>{
        if(err) throw err;
        result(resdata);
    })
}

hoa_don.insert = function(data, result) {
    connection.query(
      'insert into hoa_don (id_khach_hang, id_xe ,ngay_dat,ngay_nhan) value (?, ?, ?, ?) ',
      [data.id_KH, data.id_xe, data.ngay_dat, data.ngay_nhan],
      (err, results) => {
        if(err) throw err;
        result(results);
      })
}

export default hoa_don;