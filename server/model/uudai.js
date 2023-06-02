import connection from '../common/connect.js';

const uu_dai=function(uu_dai){
    this.id = uu_dai.id;
    this.loai_uu_dai = uu_dai.loai_uu_dai;
    this.phan_tram = uu_dai.phan_tram;
    this.id_uu_dai = uu_dai.id_uu_dai;
}

uu_dai.getAll= function(result){
    connection.query("select * from uu_dai", (err, resdata)=>{
        if(err) throw err;
        result(resdata);
    })
}

export default uu_dai ;