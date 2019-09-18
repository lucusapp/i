const express = require ('express');
const app = express ();




app.post('/login', (req,res)=>{
    res.json({
        ok:true
    })

})













module.exports = app;