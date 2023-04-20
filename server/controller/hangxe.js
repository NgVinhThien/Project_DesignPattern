import hangxe from '../model/hangxe.js';
export const getHangXe= (req, res)=>{
    hangxe.getAll((data)=>{
        res.send(data);
    });

}
export const getIdHangXe = function(req, res){
    hangxe.getAllIdHangXe(req.params.id,function(response){
         res.send(response);
    });
}
