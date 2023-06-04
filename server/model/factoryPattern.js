import connection from "../common/connect.js";

export class Data {
  getData() {}
}

export function queryData(type) {
  switch (type) {
    case 'danhmuc':
      return new DanhMucData();
    case 'xe':
      return new XeData();
    case 'hangxe':
      return new HangXeData();
    case 'uudai':
      return new UuDaiData();
    default:
      throw new Error('Invalid component type');
  }
}

class DanhMucData extends Data {
  getData() {
    return new Promise((resolve, reject) => {
      connection.query("select * from danh_muc_xe", (err, results) => {
        if (err) throw err;
        resolve(results);
      });
    });
  }
}

class XeData extends Data {
  getData() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT xe.*, anh_xe.lien_ket_anh FROM xe LEFT JOIN ( SELECT id_xe, lien_ket_anh FROM anh_xe GROUP BY id_xe ) AS anh_xe ON xe.id = anh_xe.id_xe", (err, results) => {
        if (err) throw err;
        resolve(results);
      });
    });
  }
}

class HangXeData extends Data {
  getData() {
    return new Promise((resolve, reject) => {
      connection.query("select * from hang_xe", (err, results) => {
        if (err) throw err;
        resolve(results);
      });
    });
  }
}

class UuDaiData extends Data {
  getData() {
    return new Promise((resolve, reject) => {
      connection.query("select * from uu_dai", (err, results) => {
        if (err) throw err;
        resolve(results);
      });
    });
  }
}