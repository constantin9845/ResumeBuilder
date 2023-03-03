const express = require('express');
const path = require('path');
const fs = require('fs');
const { title } = require('process');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: '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',
});

const app = express(); 

const PORT = process.env.PORT || 3060;

app.use(express.static('public'));
app.set('views');

let titleName;
let birth;
let address;
let phone;
let email;
let summary;
let skills;
let experienceTimes;
let experienceTitles;
let tempExperienceDescriptionResult; 
let educationTimes;
let educationTitles;
let educationDescriptions;
let referenceTitles;
let referencedescriptions;
let templateChosen;

// Text generation with OpenAI
app.get('/Generate-text', async (req,res)=>{
    let generateData = req.query.generateData;


    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        prompt: generateData,
        model: "text-davinci-003",
        max_tokens: 200,
    })
    
    res.json({ status : true, generatedText : completion.data.choices[0].text})
})


app.get('/', (req,res)=>{
    res.render('landing.ejs');
});

app.get('/builder', (req,res)=>{
    res.render('builder.ejs')
});

app.get('/resume', (req,res)=>{
    var sqlValue = [req.query.titleName, req.query.birth, req.query.address, req.query.phone, req.query.email, req.query.summary, req.query.skills, req.query.experienceTimes, req.query.experienceTitles, req.query.tempExperienceDescriptionResult, req.query.educationTimes, req.query.educationTitles, req.query.educationDescriptions, req.query.referenceTitles, req.query.referencedescriptions];

    titleName = sqlValue[0];
    birth = sqlValue[1];
    address = sqlValue[2];
    phone = sqlValue[3];
    email = sqlValue[4];
    summary = sqlValue[5];
    skills = sqlValue[6];
    experienceTimes = sqlValue[7];
    experienceTitles = sqlValue[8];
    tempExperienceDescriptionResult = sqlValue[9];
    educationTimes = sqlValue[10];
    educationTitles = sqlValue[11];
    educationDescriptions = sqlValue[12];
    referenceTitles = sqlValue[13];
    referencedescriptions = sqlValue[14];

    templateChosen = req.query.templateChosen;

    res.json({ status : true , skillsTable : skills});

    return titleName, birth, address, phone, email, summary, skills, experienceTimes, experienceTitles, tempExperienceDescriptionResult, educationTimes, educationTitles, educationDescriptions, referenceTitles, referencedescriptions, templateChosen;
});

async function generatePdf(html) {
    const browser = await puppeteer.launch({ headless: true,  args: ['--no-sandbox']  });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: 1,
        bottom: 1
      },
    });
    await browser.close();
    return pdf;
};

app.get('/result-display', async (req,res)=>{

    let ejsTemplate;

    if(templateChosen == 1){
        ejsTemplate = fs.readFileSync('./views/resume-template1.ejs', 'utf-8');
    }
    if(templateChosen == 2){
        ejsTemplate = fs.readFileSync('./views/resume-template2.ejs', 'utf-8');
    }
    if(templateChosen == 3){
        ejsTemplate = fs.readFileSync('./views/resume-template3.ejs', 'utf-8');
    }
    if(templateChosen == 4){
        ejsTemplate = fs.readFileSync('./views/resume-template4.ejs', 'utf-8');
    }


    // render the ejs file to html
    const html = ejs.render(ejsTemplate, { titleName, birth, address, phone, email, summary, skills, experienceTimes, experienceTitles, tempExperienceDescriptionResult, educationTimes, educationTitles, educationDescriptions, referenceTitles, referencedescriptions });
    // convert the html to pdf
    const pdf = await generatePdf(html);
    // set the headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');

    // send the pdf as response
    res.send(pdf);
});

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});

// Start new templates, 
// 
// Add possibility to change credentials when in edit mode