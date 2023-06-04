import connection from '../common/connect.js';
export  class Xe{
    constructor(id, ten_xe, gia, id_hang_xe, id_danh_muc_xe, mota, mau, loai_uu_dai, gia_uu_dai){
        this.id= id
        this.ten_xe= ten_xe
        this.gia= gia
        this.id_hang_xe= id_hang_xe
        this.id_danh_muc_xe= id_danh_muc_xe
        this.mota= mota
        this.mau= mau
        this.loai_uu_dai= loai_uu_dai
        this.gia_uu_dai= gia_uu_dai
    }
    
    add= function(result){
        connection.query(
            'insert into xe (ten_xe, gia, id_hang_xe, id_danh_muc_xe, mota, mau, loai_uu_dai, gia_uu_dai) value (?, ?, ?, ?, ?, ?, ?, ?)',
            [this.ten_xe, this.gia, this.id_hang_xe, this.id_danh_muc_xe, this.mota, null, this.loai_uu_dai, this.gia_uu_dai],
            (err, results) => {
              if(err) throw err;
            //   console.log(results);
              result(results);
            })
    }
    addImg= function(id_xe,pathImg, result){
        connection.query(
            'insert into anh_xe(id_xe, lien_ket_anh) value (?, ?)',
            [id_xe, pathImg],
            (err, results) => {
              if(err) throw err;
            //   console.log(results);
              result(results);
            })
    }
    deleteImg= function(result){
        connection.query(
            'delete from anh_xe where id_xe=?',
            this.id,
            (err, results)=>{
                if(err) throw err;
                result(results);
            }
        )
    }
    deleteXe= function(result){
        connection.query(
            'delete from xe where id= ?',
            this.id,
            (err, results)=>{
                if(err) throw err;
                result(results);
            }
        )
    }
    getDetails= function(result){
        connection.query(
            'select * from xe where id=?', 
            this.id,
            (err, results)=>{
                if(err) throw err;
                result(results);
            }
        )
    }
    updateXe=  function(result){
        connection.query(
            'update xe set ten_xe= ?, gia= ?, mota= ?, loai_uu_dai=?, gia_uu_dai= ? where id= ?', 
            [this.ten_xe, this.gia, this.mota, this.loai_uu_dai, this.gia_uu_dai, this.id],
            (err, results)=>{
                if(err) throw err;
                result(results);
            }
        )
    }
    
}