import hoa_don from "../model/hoa_don.js";
import _JWT from "../common/_JWT.js";

export const getAllHD= async function(req, res){

    var tokenKH= req.headers.authorization;
    const dataKH= await _JWT.check(tokenKH);
    
    // console.log(dataKH.data[0]['id']);
    if(dataKH != null){
        const id_KH= dataKH.data[0]['id'];
        hoa_don.getAllHD(id_KH, (result)=>{
            res.status(200).send({data: JSON.stringify(result)});
        })
    }
}
export const insertHoaDon = (req, res) => {
    const data = req.body;
    hoa_don.insert(data, (result) => {
    if (result) {
    res.send({ message: 'Thêm hoá đơn thành công' });
    } else {
    res.send({ message: 'Thêm hoá đơn không thành công' });
    }
    })
}