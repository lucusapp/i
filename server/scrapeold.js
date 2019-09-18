
// const express = require ('express');
// const app = express ();

// const Producto = require ('./models/productos');


// const cheerio = require ('cheerio');
// const fs = require ('fs');
// const request = require ('request')

// url= 'https://es.aliexpress.com/item/Support-Spanish-Xiaomi-Huami-Amazfit-Stratos-Pace-2-Smart-Watch-men-GPS-PPG-Heart-Rate/32852437830.html?spm=es_lc.10010108.1000013.1.e0c05f65OvuKwq&gps-id=pcDetailBottomMoreThisSeller&scm=1007.13339.90158.0&scm_id=1007.13339.90158.0&scm-url=1007.13339.90158.0&pvid=e19cf7e4-b98a-4d77-804f-096eb201b322'


// let imagenes=[]


//   request({url,encoding:'binary'},(err,res,body)=>{
//      if(!err && res.statusCode == 200) {
//         let $ = cheerio.load(body)
//                  //console.log(body)

             
//        let chocho = $('.img-thumb-item','#j-detail-gallery-main').each(function(){
//             img=$(this).find('img').attr('src')
//           imagenes.push(img);

//      //  console.log(img);
//     })
//        $('.item-sku-image','#j-sku-list-2').each(function(){
//           var precim= $(this).find('img').attr('src')
//          // console.log(precim);
//        })
 
//         $('#j-sku-price','.product-price-area').each(function(){
//          var precio= $(this).html()
//         //console.log(precio);
//        })
       
//        $('.property-item','#j-product-desc').each(function(){
//          var detalles= $('.property-item').text()
//          var descrip= $('.propery-des').html()
//         //console.log(detalles);
//        })


//     }
 

 
//    // console.log(imagenes);
        
//     // for (var i = 0; i < imagenes.length; i++) {
//     //     request (imagenes[i]).pipe(fs.createWriteStream(`server/img/${i}.jpg`));
         
 
//     // }
// })
// module.exports = app
