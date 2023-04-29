import connection from "../common/connect.js";


const hoa_don=function(hoa_don){
    this.id= hoa_don.id;
    this.ngay_mua= hoa_don.ngay_mua;
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
export default hoa_don;