import connection from "../common/connect.js"

export class AnhXe{
    constructor(id, id_xe, lien_ket_anh){
        this.id= id
        this.id_xe= id_xe
        this.lien_ket_anh= lien_ket_anh
    }
    setId(id){
        this.id= id
        return this
    }
    setIdXe(id_xe){
        this.id_xe= id_xe
        return this
    }
    setLienKetAnh(lien_ket_anh){
        this.lien_ket_anh= lien_ket_anh
        return this
    }

    getAnh= function(result){
        connection.query(
            'select * from anh_xe where id_xe=?',
            this.id_xe,
            (err, results) => {
              if(err) throw err;
              result(results);
            })
    }
}