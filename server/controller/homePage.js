import { DanhMucProxy } from '../model/danhmuc.js';
import xe from "../model/xe.js";
import hangxe from '../model/hangxe.js';
export const getHomepage = (req, res) => {
    let row;
    let hangxeData;

    xe.getAll((result) => {
        row = result;


            hangxe.getAll((hangxeResult) => {
                hangxeData = hangxeResult;

                return res.render('homePage.ejs', { dataXe: row, dataHangxe: hangxeData });
            });
    });
};
export const getDetailXe= (req, res)=>{
    
    let id_xe= req.params.id_xe;
    // console.log(">>>Check request params", id_xe);
    xe.getDetailXeById(id_xe, (result)=> {
        // console.log(">>>Check details Xe", result);
        return res.render('detailsXe.ejs', {detailsXe: JSON.stringify(result)});
    })
   
}

const decorator = (originalFn) => {
    return (req, res) => {
      let id = req.params.id;
    
      DanhMucProxy.getAllIdDanhMuc(id, (result) => {
        let danhmucXe = result;
    
        DanhMucProxy.getAll((danhmucData) => {
          hangxe.getAll((hangxeData) => {
            const data = {
              danhmucXe: danhmucXe,
              dataDanhmuc: danhmucData,
              dataHangxe: hangxeData
            };
    
    
            originalFn(req, res, data);
          });
        });
      });
    };
  };
  

  const getAllIdDanhMuc = (req, res, data) => {
    res.render('danhmucXe.ejs', data);
  };
  

  const decoratedGetAllIdDanhMuc = decorator(getAllIdDanhMuc);
  
 
  export { decoratedGetAllIdDanhMuc as getAllIdDanhMuc };
  


export const getAllIdHangXe= (req, res)=>{
    
    let id= req.params.id;
    hangxe.getAllIdHangXe(id, (result)=> {
        return res.render('hangXe.ejs', {idHangXe: JSON.stringify(result)});
    })
   
}

