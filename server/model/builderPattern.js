import {Xe} from "./xe.js"
export  class XeBuilder{
    constructor(){
        this.xe= new Xe();
    }
    setId(id) {
        this.xe.id = id;
        return this;
    }
    
    setTenXe(ten_xe) {
        this.xe.ten_xe = ten_xe;
        return this;
    }
    
    setGia(gia) {
        this.xe.gia = gia;
        return this;
    }
    
    setIdHangXe(id_hang_xe) {
        this.xe.id_hang_xe = id_hang_xe;
        return this;
    }
    
    setIdDanhMucXe(id_danh_muc_xe) {
        this.xe.id_danh_muc_xe = id_danh_muc_xe;
        return this;
    }
    
    setMota(mota) {
        this.xe.mota = mota;
        return this;
    }
    
    setMau(mau) {
        this.xe.mau = mau;
        return this;
    }
    
    setLoaiUuDai(loai_uu_dai) {
        this.xe.loai_uu_dai = loai_uu_dai;
        return this;
    }
    
    setGiaUuDai(gia_uu_dai) {
        this.xe.gia_uu_dai = gia_uu_dai;
        return this;
    }
    build(){
        return this.xe;
    }
}