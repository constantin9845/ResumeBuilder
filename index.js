const express = require('express');
const path = require('path');
const fs = require('fs');
const { title } = require('process');

const app = express(); 

const PORT = process.env.PORT || 3060;


app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.set('views');

let titleName;
let birth;
let address;
let phone;
let email;
let summary;
let skills;

app.get('/', (req,res)=>{
    res.render('landing.ejs');
});

app.get('/builder', (req,res)=>{
    res.render('builder.ejs')
})

app.get('/resume', (req,res)=>{
    var sqlValue = [req.query.titleName, req.query.birth, req.query.address, req.query.phone, req.query.email, req.query.summary, req.query.skills,];

    titleName = sqlValue[0];
    birth = sqlValue[1];
    address = sqlValue[2];
    phone = sqlValue[3];
    email = sqlValue[4];
    summary = sqlValue[5];
    skills = sqlValue[6];

    res.json({ status : true , skillsTable : skills});

    return titleName, birth, address, phone, email, summary, skills;
});



app.get('/result-display', (req,res)=>{
    res.render('resume.ejs', {titleName : titleName, birth : birth, address : address, phone : phone, email : email, summary : summary, skills : skills})
})




app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});