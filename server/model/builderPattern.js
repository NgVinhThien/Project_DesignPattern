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
    setId(id) {
        this.id = id;
        return this;
    }
    
    setTenXe(ten_xe) {
        this.ten_xe = ten_xe;
        return this;
    }
    
    setGia(gia) {
        this.gia = gia;
        return this;
    }
    
    setIdHangXe(id_hang_xe) {
        this.id_hang_xe = id_hang_xe;
        return this;
    }
    
    setIdDanhMucXe(id_danh_muc_xe) {
        this.id_danh_muc_xe = id_danh_muc_xe;
        return this;
    }
    
    setMota(mota) {
        this.mota = mota;
        return this;
    }
    
    setMau(mau) {
        this.mau = mau;
        return this;
    }
    
    setLoaiUuDai(loai_uu_dai) {
        this.loai_uu_dai = loai_uu_dai;
        return this;
    }
    
    setGiaUuDai(gia_uu_dai) {
        this.gia_uu_dai = gia_uu_dai;
        return this;
      }
    add= function(result){
        connection.query(
            'insert into xe (ten_xe, gia, id_hang_xe, id_danh_muc_xe, mota, mau, loai_uu_dai, gia_uu_dai) value (?, ?, ?, ?, ?, ?, ?, ?)',
            [this.ten_xe, this.gia, this.id_hang_xe, this.id_danh_muc_xe, this.mota, null, this.loai_uu_dai, this.gia_uu_dai],
            (err, results) => {
              if(err) throw err;
              console.log(results);
              result(results);
            })
    }
}