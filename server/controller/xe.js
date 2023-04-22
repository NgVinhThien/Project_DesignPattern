import xe from '../model/xe.js';
export const getXe= (req, res)=>{
    xe.getAll((data)=>{
        res.send(data);
    });
}