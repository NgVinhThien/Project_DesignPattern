import connection from '../common/connect.js';

class HangXe {
  constructor(hangxe) {
    this.id = hangxe.id;
    this.ten_hang_xe = hangxe.ten_hang_xe;
    this.logo = hangxe.logo;
    this.ten_xe = hangxe.ten_xe;
    this.gia = hangxe.gia;
    this.id_danh_muc_xe = hangxe.id_danh_muc_xe;
  }

  static getAll(callback) {
    connection.query("SELECT * FROM hang_xe", (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }

  static getAllIdHangXe(id, callback) {
    connection.query("SELECT xe.id, xe.ten_xe, xe.gia, xe.mau, xe.mota, anh_xe.lien_ket_anh FROM xe JOIN hang_xe ON xe.id_hang_xe = hang_xe.id JOIN (SELECT id_xe, lien_ket_anh FROM anh_xe GROUP BY id_xe) AS anh_xe ON xe.id = anh_xe.id_xe WHERE hang_xe.id = ?", id, (err, hangxe) => {
      if (err) {
        callback(null);
      } else {
        callback(hangxe);
      }
    });
  }
}

class HangXeProxy {
  static getAll(callback) {
    HangXe.getAll((results) => {
      callback(results);
    });
  }
  static getAllIdHangXe(id, callback) {
    HangXe.getAllIdHangXe(id, (hangxe) => {
      callback(hangxe);
    });
  }
}

export { HangXe, HangXeProxy };
class HangXe1 {
  constructor(hangXe) {
    this.id = hangXe.id;
    this.ten_hang_xe = hangXe.ten_hang_xe;
    this.logo = hangXe.logo;
    // ...
  }

  static addHangXe(hangXeData, callback) {
    const { ten_hang_xe, logo } = hangXeData;

    const imagePath = `http://localhost:5000/${logo}`;

    const query = 'INSERT INTO hang_xe (ten_hang_xe, logo) VALUES (?, ?)';
    connection.query(query, [ten_hang_xe, imagePath], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        const hangXe = new HangXe1({
          id: result.insertId,
          ten_hang_xe: ten_hang_xe,
          logo: imagePath,
        });
        callback(null, hangXe);
      }
    });
  }

  static deleteHangXe(id, callback) {
    const query = 'DELETE FROM hang_xe WHERE id = ?';
    connection.query(query, [id], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.affectedRows > 0);
      }
    });
  }
}

class HangXeAdapter {
  addHangXe(hangXeData, callback) {
    HangXe1.addHangXe(hangXeData, (err, hangXe) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, hangXe);
      }
    });
  }
  deleteHangXe(id, callback) {
    HangXe1.deleteHangXe(id, (err, isDeleted) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, isDeleted);
      }
    });
  }

  // ...
}

export { HangXe1, HangXeAdapter };

