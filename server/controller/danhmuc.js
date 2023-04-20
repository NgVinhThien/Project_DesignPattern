import danhmuc from '../model/danhmuc.js';
export const getDanhMuc= (req, res)=>{
    danhmuc.getAll((data)=>{
        res.send(data);
    });

}
export const getIdDanhMuc = function(req, res){
    danhmuc.getAllIdDanhMuc(req.params.id,function(response){
         res.send(response);
    });
}
