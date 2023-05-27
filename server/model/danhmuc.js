import connection from '../common/connect.js';

class DanhMuc {
  constructor(danhmuc) {
    this.id = danhmuc.id;
    this.ten_danh_muc = danhmuc.ten_danh_muc;
    this.anh_dai_dien = danhmuc.anh_dai_dien;
    this.ten_xe = danhmuc.ten_xe;
    this.gia = danhmuc.gia;
    this.id_danh_muc_xe = danhmuc.id_danh_muc_xe;
  }

  static getAll(callback) {

    connection.query("SELECT * FROM danh_muc_xe", (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }

  static getAllIdDanhMuc(id, callback) {

    connection.query("SELECT xe.id, xe.ten_xe, xe.gia, xe.mau, xe.mota, anh_xe.lien_ket_anh FROM xe JOIN danh_muc_xe ON xe.id_danh_muc_xe = danh_muc_xe.id JOIN (SELECT id_xe, lien_ket_anh FROM anh_xe GROUP BY id_xe) AS anh_xe ON xe.id = anh_xe.id_xe WHERE danh_muc_xe.id = ?", id, (err, danhmuc) => {
      if (err) {
        callback(null);
      } else {
        callback(danhmuc);
      }
    });
  }
}

class DanhMucProxy {
  static getAll(callback) {
    DanhMuc.getAll((results) => {
      callback(results);
    });
  }
  static getAllIdDanhMuc(id, callback) {
    DanhMuc.getAllIdDanhMuc(id, (danhmuc) => {
    
      callback(danhmuc);
    });
  }
}

export { DanhMuc, DanhMucProxy };
