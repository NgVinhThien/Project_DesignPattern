class Data{
    getData(){} 
}
import connection from "../common/connect.js";
export function queryData(type){
    switch (type){
        case 0:
            return new getDanhMuc();
        case 1:
            return new getXe();
        case 2:
            return new getHangXe();
        default:
            throw new Error('Invalid component type');
            
    }
}
// class DataFactory{
//     queryData(type){
//         switch(type){
//             case 'danhmuc':
//                 return new getDanhMuc();
//             case 'xe':
//                 return new getXe();
//             case 'hangxe':
//                 return new getHangXe();
//             default:
//                 throw new Error('Invalid component type');
//         }

//     }
// };
// import connection from "../common/connect.js";
class getDanhMuc extends Data{
    getData(){
        connection.query("select * from danh_muc_xe", (err, results)=>{
            if(err) throw err; 
            console.log(typeof(results));
            return results;
        });
    }
};
class getXe extends Data{
    getData(){
        connection.query("SELECT xe.*, anh_xe.lien_ket_anh FROM xe LEFT JOIN ( SELECT id_xe, lien_ket_anh FROM anh_xe GROUP BY id_xe ) AS anh_xe ON xe.id = anh_xe.id_xe", (err, results)=>{
            if(err) throw err; 
            console.log(typeof(results));
            return results;
        });
    }
};
class getHangXe extends Data{
    getData(){
        connection.query("select * from hang_xe", (err, results)=>{
            if(err) throw err; 
            console.log(typeof(results));
            return results;
        });    
    }
}