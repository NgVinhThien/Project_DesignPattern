import connection from '../common/connect.js';

const anhxe = function(anhxe){
    this.id_anh= anhxe.id_anh;
    this.id_xe = anhxe.id_xe
    this.lien_ket_anh = anhxe.lien_ket_anh
}
anhxe.getAllIdAnhXe= function(id,result){
    console.log(id);
    connection.query("SELECT * from anh_xe where id_xe = ?", id ,function(err,anhxe){
        console.log(err,anhxe)
        if(err)
        {
            result(null);
        }else{
            result(anhxe);
        }
    });
    
}

export default anhxe;