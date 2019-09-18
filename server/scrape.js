
const express = require ('express');
const app = express ();

const Producto = require ('./models/productos');


const cheerio = require ('cheerio');
const fs = require ('fs');
const rp = require('request-promise');
const writeStream = fs.createWriteStream ('post.csv')


//Write headers
writeStream.write(`titulo,precio,imagenes`)






let options = {
  
  uri: 'https://es.aliexpress.com/item/Support-Spanish-Xiaomi-Huami-Amazfit-Stratos-Pace-2-Smart-Watch-men-GPS-PPG-Heart-Rate/32852437830.html?spm=es_lc.10010108.1000013.1.e0c05f65OvuKwq&gps-id=pcDetailBottomMoreThisSeller&scm=1007.13339.90158.0&scm_id=1007.13339.90158.0&scm-url=1007.13339.90158.0&pvid=e19cf7e4-b98a-4d77-804f-096eb201b322',
  transform: (body)=> cheerio.load(body),

  headers: {
    'User-Agent': 'Request-Promise'
    },
json: true // Automatically parses the JSON string in the response
};

let imagenes = []

rp(options)
   
    .then(function ($) {
      
     

        $('.detail-main').each(function(){
            let titulo = $(this).find('.product-name').html();
            let precio = $(this).find('#j-sku-price','.p-price').html();
            let image = $('.img-thumb-item','#j-detail-gallery-main').each(function(){
               img = $(this).find('img').attr('src');
               imagenes.push(img)

            })
            
            //console.log(imagenes);

                    for (var i = 0; i < imagenes.length; i++) {
                         rp (imagenes[i]).pipe(fs.createWriteStream(`server/img/${i}.jpg`))


    //    $().each(function(){
    //      var detalles= $('.property-item').text()
    //      var descrip= $('.propery-des').html()
    //     console.log(descrip);
    //    })


    producto = new Producto({
        titulo,
        precio,
        imagenes,
    })
}

    console.log(producto);

    app.get('/', function(req,res){ 
        return res.json ({
            ok:true,
            producto
           });

    })
    
    
    ,
    app.post('/', function(req,res){   

    producto.save((err,productoDB)=>{
     if (err){
         return status(400).json({
             ok:false,
             err
            });
        }  

     return res.json ({
         ok:true,
         producto:productoDB
        });

        }) ;
    
    })
})
    })

    
    .catch(function(err){
        ok:false,
        err
        
    })
   
    
    // Crawling failed or Cheerio choked...
  
   

 

  // request({url,encoding:'binary'},(err,res,body)=>{
  //    if(!err && res.statusCode == 200) {
  //       let $ = cheerio.load(body)
  //                //console.log(body)

             
  
  //      })
 
  //       $('#j-sku-price','.product-price-area').each(function(){
  //        var precio= $(this).html()
  //       //console.log(precio);
  //      })
       
  //      $('.property-item','#j-product-desc').each(function(){
  //        var detalles= $('.property-item').text()
  //        var descrip= $('.propery-des').html()
  //       //console.log(detalles);
  //      })


  //   }
  // })

 
    // console.log(imagenes);
        

         
 

// }
module.exports = app;