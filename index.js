const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express(); 

const PORT = process.env.PORT || 3060;


app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.set('views');

app.get('/', (req,res)=>{
    res.render('landing.ejs');
});

app.get('/builder', (req,res)=>{
    res.render('builder.ejs')
})


app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});