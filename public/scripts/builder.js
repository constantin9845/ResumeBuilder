// catching enter input to add <br>
const inputId = document.querySelector('#edit-summary');
const outputId = document.querySelector('#preview-summary');

inputId.addEventListener('keydown',(event)=>{
    if (event.key === 'Enter') {
        inputId.value = inputId.value.concat(' ', '<br>');
        return;
    };
});


document.querySelector('#add-summary').addEventListener('click', ()=>{
    outputId.innerHTML = inputId.value;
    outputId.style.textAlign = 'center';
});

// catching enter input to add <br>
document.querySelector('#edit-experience-description').addEventListener('keydown',(event)=>{
    if (event.key === 'Enter') {
        document.querySelector('#edit-experience-description').value = document.querySelector('#edit-experience-description').value.concat(' ', '<br>');
        return;
    };
});

const setupPopUp = document.querySelector('.initial-setup');
const buildView = document.querySelector('.builder-view');
var allTemplates = document.querySelectorAll('.template');
var allTemplateImages = document.querySelectorAll('.template-img');
var allTemplateP = document.querySelectorAll('.template-p');
const setup1 = document.querySelector('#setup-step1');
const setup2 = document.querySelector('#setup-step2');

const saveCredentials = document.querySelector('#save-credentials');

var totalArr = [];

for (let i = 0; i < allTemplates.length; i++) {
    totalArr.push(allTemplates[i]);
    totalArr.push(allTemplateImages[i]);
    totalArr.push(allTemplateP[i]);
};

// SET UP POP UP
buildView.style.display = 'none';
var templateSelected = undefined;

for(let i = 0; i < totalArr.length; i++){
    totalArr[i].addEventListener('click', function(event){
        var element = event.target;

        var id = element.id;

        templateSelected = id;
        
        // template chosen => apply styling for preview container here
        // // 
        // //

        // Fill in credentials
        setup1.style.display = 'none';
        setup2.style.display = 'flex';

        saveCredentials.addEventListener('click', function(){
            const myName = $('#full-name').val();
            const myBirth =  $('#birth').val();
            const myAddress = $('#address').val();
            const myNumber = $('#number').val();
            const myEmail = $('#email').val();

            if(myName == '' || myAddress == '' || myEmail == ''){
                alert('Fill in all required fields')
                return;
            }

            // Show editor mode
            setup2.style.display = 'none';
            setupPopUp.style.display = 'none';
            buildView.style.display = 'flex';

            // Add new css file based on which template was chosen
            function addCSSTemplate(template){
                // Create the link element
                var link = document.createElement("link");
                link.href = `/public/css/template${template}.css`;
                link.rel = "stylesheet";
             
                // Add the link element to the head of the HTML document
                document.head.appendChild(link);
            }

            addCSSTemplate(templateSelected);


            // fill in credentials + style
            const previewName = document.querySelector('#preview-name');
            const previewBirth = document.querySelector('.credentials-span-birth');
            const previewAddress = document.querySelector('.credentials-span-address');
            const previewNumber = document.querySelector('.credentials-span-number');
            const previewEmail = document.querySelector('.credentials-span-email');

            previewName.innerHTML = myName;
            previewBirth.innerHTML = myBirth;
            previewAddress.innerHTML = myAddress;
            previewNumber.innerHTML = myNumber;
            previewEmail.innerHTML = myEmail;

        })
        return templateSelected;
    })
}






const addSkill = document.querySelector('#add-skill');
const addExperience = document.querySelector('#add-experience');
const addEducation = document.querySelector('#add-education');
const addReference = document.querySelector('#add-reference');

const editSkill = document.querySelector('#edit-skill');
const editExperienceTime = document.querySelector('#edit-experience-time');
const editExperienceTitle = document.querySelector('#edit-experience-title');
const editExperiencedescription = document.querySelector('#edit-experience-description');

const editEducationTime = document.querySelector('#edit-education-time');
const editEducationTitle = document.querySelector('#edit-education-title');
const editEducationdescription = document.querySelector('#edit-education-description');

const editReferenceTitle = document.querySelector('#edit-reference-title');
const editReferencedescription = document.querySelector('#edit-reference-description');

const previewSkillTable = document.querySelector('.preview-skills-table');
const previewExperienceTable = document.querySelector('.preview-experience-table');
const previewEducationTable = document.querySelector('.preview-education-table');
const previewReferenceTable = document.querySelector('.preview-reference-table');
const previewSkillTableElems = previewSkillTable.querySelectorAll('td');

// Preview Executers
addSkill.addEventListener('click', function(){
    addingSkill();
    editSkill.value = '';
});

previewSkillTable.addEventListener('click', function(){
    deleteSkill();
});

addExperience.addEventListener('click', function(){
    addingExperience();
    editExperienceTime.value = '';
    editExperienceTitle.value = '';
    editExperiencedescription.value = '';
});

previewExperienceTable.addEventListener('click', function(){
    modifyExperience();
});

addEducation.addEventListener('click', function(){
    addingEducation();
    editEducationTime.value = '';
    editEducationTitle.value = '';
    editEducationdescription.value = '';
});

previewEducationTable.addEventListener('click', function(){
    modifyEducation();
});

addReference.addEventListener('click', function(){
    addingReference();
    editEducationTime.value = '';
    editEducationTitle.value = '';
    editEducationdescription.value = '';
});

previewReferenceTable.addEventListener('click', function(){
    modifyReference();
});


// Preview Functions
function addingSkill(){

    var allCells = previewSkillTable.querySelectorAll('td');
    var allCellsLength = allCells.length;

    if(allCellsLength == 9){
        alert('Max items added!');
        return;
    };

    let rows = previewSkillTable.rows; 
    let data = `&#x2022; ${$('#edit-skill').val()}`;

    // check if field is not empty
    if(data != ''){
        // check if any rows already exist
        if(rows.length == 0){
            // make a new tr elem
            let newTR = document.createElement('tr');
            newTR.className = 'skill-row';
            previewSkillTable.appendChild(newTR);

            let newTD = document.createElement('td');
            newTD.className = 'skill-cell';
            newTD.innerHTML = data;
            rows.item(0).appendChild(newTD);

            newTD.setAttribute("id",`${allCellsLength}`);

            return;
        };
        if(rows.length > 0){
            // get last row
            var lastRow = rows.item(rows.length - 1);

            if(lastRow.children.length == 3){
                // make new row first
                let newTR = document.createElement('tr');
                newTR.className = 'skill-row';
                previewSkillTable.appendChild(newTR);

                lastRow = rows.item(rows.length - 1);

                let newTD = document.createElement('td');
                newTD.className = 'skill-cell';
                newTD.innerHTML = data;
                lastRow.appendChild(newTD);

                newTD.setAttribute("id",`${allCellsLength}`);

                return;
            }

            if(lastRow.children.length < 3){
                let newTD = document.createElement('td');
                newTD.className = 'skill-cell';
                newTD.innerHTML = data;
                lastRow.appendChild(newTD);

                newTD.setAttribute("id",`${allCellsLength}`);

                return;
            }
        }
        
    };
    if(data == ''){
        alert('Add a skill!');
        return;
    };
};

function deleteSkill(){
    // get the element that was clicked on
    var element = event.target;
    var id = element.id;
  
    var allCells = previewSkillTable.querySelectorAll('td');
    var allCellsLength = allCells.length;

    id = parseInt(id)

    for(i = id; i < allCellsLength-1; i++){
        allCells[i].innerHTML = allCells[i+1].innerHTML;
    }

    allCells[allCellsLength-1].remove();
};

function addingExperience(){
    let rows = previewExperienceTable.rows; 
    let time = $('#edit-experience-time').val();
    let jobTitle = $('#edit-experience-title').val();
    let jobDescription = $('#edit-experience-description').val();


    var allCells = previewExperienceTable.querySelectorAll('tr');
    var allCellsLength = allCells.length;

    if(time != '' && jobTitle != '' && jobDescription != ''){
        // create new tr and add to table
        let newTR = document.createElement('tr');
        newTR.className = 'experience-row';

        // create 4 divs with class names to style new element
        let timeDiv = document.createElement('div');
        let contentDiv = document.createElement('div');
        let titleDiv = document.createElement('div');
        let descriptionDiv = document.createElement('div');
        let modifyDiv = document.createElement('div');

        let timeP = document.createElement('p');
        let titleP = document.createElement('p');
        let descriptionP = document.createElement('p');

        // Deletand edit button for each job
        let editJob = document.createElement('p');
        let deleteJob = document.createElement('p');

        editJob.innerHTML = 'EDIT';
        deleteJob.innerHTML = 'X';

        editJob.className = 'edit-job-btn';
        deleteJob.className = 'delete-job-btn';

        editJob.setAttribute('id',`${allCellsLength}`);
        newTR.setAttribute('id', `tr-${allCellsLength}`);

        timeP.className = `time-data-${allCellsLength}`;
        titleP.className = `title-data-${allCellsLength}`;
        descriptionP.className = `description-data-${allCellsLength}`;

        timeP.classList.add('experience-time');
        titleP.classList.add('experience-title');
        descriptionP.classList.add('experience-description');

        timeP.innerHTML = time;
        titleP.innerHTML = jobTitle;
        descriptionP.innerHTML = jobDescription;

        modifyDiv.appendChild(editJob);
        modifyDiv.appendChild(deleteJob);
        timeDiv.appendChild(timeP);
        titleDiv.appendChild(titleP);
        descriptionDiv.appendChild(descriptionP);

        timeDiv.className = 'time-div';
        contentDiv.className = 'content-div';
        titleDiv.className = 'title-div';
        descriptionDiv.className = 'description-div';
        modifyDiv.className = 'modify-div';
        
        contentDiv.appendChild(modifyDiv);
        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(descriptionDiv);

        newTR.appendChild(timeDiv);
        newTR.appendChild(contentDiv);

        previewExperienceTable.insertBefore(newTR, previewExperienceTable.firstChild);

        return
    };
    if(time == '' || jobTitle == '' || jobDescription == ''){
        alert('Fill in all the fields!');
        return;
    };
};

function modifyExperience(){
    // get elem clicked on
    var element = event.target;
    var id = element.id;
    var classVal = element.className;

    var parent = element.parentNode;
    parent = parent.parentNode;
    parent = parent.parentNode;

    // delete
    if(classVal == 'delete-job-btn'){
        parent.remove();
    }

    // edit
    if(classVal == 'edit-job-btn' && !document.getElementById('temporary-id')){
        // get data
        let time = parent.getElementsByClassName(`time-data-${id}`)[0].innerHTML;
        let title = parent.getElementsByClassName(`title-data-${id}`)[0].innerHTML;
        let description = parent.getElementsByClassName(`description-data-${id}`)[0].innerHTML;

        // fill data into input fields for edit
        document.querySelector('#edit-experience-time').value = time;
        document.querySelector('#edit-experience-title').value = title;
        document.querySelector('#edit-experience-description').value = description;

        
        let addBtn = document.querySelector('#add-experience');
        addBtn.style.display = 'none';

        let tempBtn = document.createElement('p');
        tempBtn.id = 'temporary-id';
        tempBtn.innerHTML = 'SAVE';

        document.querySelector('.edit-experience-input').appendChild(tempBtn)

        // save updated data + restore button
        tempBtn.addEventListener('click', function(){
            let newTime = document.querySelector('#edit-experience-time').value;
            let newTitle = document.querySelector('#edit-experience-title').value;
            let newDescription = document.querySelector('#edit-experience-description').value;

            parent.getElementsByClassName(`time-data-${id}`)[0].innerHTML = newTime;
            parent.getElementsByClassName(`title-data-${id}`)[0].innerHTML = newTitle;
            parent.getElementsByClassName(`description-data-${id}`)[0].innerHTML = newDescription;

            document.querySelector('#edit-experience-time').value = '';
            document.querySelector('#edit-experience-title').value = '';
            document.querySelector('#edit-experience-description').value = '';

            tempBtn.remove();
            addBtn.style.display = 'block';
        })
    }

};

function addingEducation(){
    let rows = previewExperienceTable.rows; 
    let time = $('#edit-education-time').val();
    let educationTitle = $('#edit-education-title').val();
    let educationDescription = $('#edit-education-description').val();

    var allCells = previewEducationTable.querySelectorAll('tr');
    var allCellsLength = allCells.length;

    if(time != '' && educationTitle != '' && educationDescription != ''){
        // create new tr and add to table
        let newTR = document.createElement('tr');
        newTR.className = 'single-education';

        // create 4 divs with class names to style new element
        let timeDiv = document.createElement('div');
        let contentDiv = document.createElement('div');
        let titleDiv = document.createElement('div');
        let descriptionDiv = document.createElement('div');
        let modifyDiv = document.createElement('div');

        let timeP = document.createElement('p');
        let titleP = document.createElement('p');
        let descriptionP = document.createElement('p');

        // Deletand edit button for each job
        let editEducation = document.createElement('p');
        let deleteEducation = document.createElement('p');

        editEducation.innerHTML = 'EDIT';
        deleteEducation.innerHTML = 'X';

        editEducation.className = 'edit-education-btn';
        deleteEducation.className = 'delete-education-btn';

        editEducation.setAttribute('id',`${allCellsLength}`);
        newTR.setAttribute('id', `tr-${allCellsLength}`);

        timeP.className = `time-data-${allCellsLength}`;
        titleP.className = `title-data-${allCellsLength}`;
        descriptionP.className = `description-data-${allCellsLength}`;

        timeP.classList.add('education-time');
        titleP.classList.add('education-title');
        descriptionP.classList.add('education-description');

        timeP.innerHTML = time;
        titleP.innerHTML = educationTitle;
        descriptionP.innerHTML = educationDescription;

        modifyDiv.appendChild(editEducation);
        modifyDiv.appendChild(deleteEducation);
        timeDiv.appendChild(timeP);
        titleDiv.appendChild(titleP);
        descriptionDiv.appendChild(descriptionP);

        timeDiv.className = 'time-div';
        contentDiv.className = 'content-div';
        titleDiv.className = 'title-div';
        descriptionDiv.className = 'description-div';
        modifyDiv.className = 'modify-div';
        
        contentDiv.appendChild(modifyDiv);
        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(descriptionDiv);

        newTR.appendChild(timeDiv);
        newTR.appendChild(contentDiv);

        previewEducationTable.insertBefore(newTR, previewEducationTable.firstChild);

        return
    };
    if(time == '' || educationTitle == '' || educationDescription == ''){
        alert('Fill in all the fields!');
        return;
    };
};

function modifyEducation(){
    // get elem clicked on
    var element = event.target;
    var id = element.id;
    var classVal = element.className;

    var parent = element.parentNode;
    parent = parent.parentNode;
    parent = parent.parentNode;

    // delete
    if(classVal == 'delete-education-btn'){
        parent.remove();
    }

    // edit
    if(classVal == 'edit-education-btn' && !document.getElementById('temporary-id')){
        // get data
        let time = parent.getElementsByClassName(`time-data-${id}`)[0].innerHTML;
        let title = parent.getElementsByClassName(`title-data-${id}`)[0].innerHTML;
        let description = parent.getElementsByClassName(`description-data-${id}`)[0].innerHTML;

        // fill data into input fields for edit
        document.querySelector('#edit-education-time').value = time;
        document.querySelector('#edit-education-title').value = title;
        document.querySelector('#edit-education-description').value = description;

        
        let addBtn = document.querySelector('#add-education');
        addBtn.style.display = 'none';

        let tempBtn = document.createElement('p');
        tempBtn.id = 'temporary-id';
        tempBtn.innerHTML = 'SAVE';

        document.querySelector('.edit-education-input').appendChild(tempBtn)

        // save updated data + restore button
        tempBtn.addEventListener('click', function(){
            let newTime = document.querySelector('#edit-education-time').value;
            let newTitle = document.querySelector('#edit-education-title').value;
            let newDescription = document.querySelector('#edit-education-description').value;

            parent.getElementsByClassName(`time-data-${id}`)[0].innerHTML = newTime;
            parent.getElementsByClassName(`title-data-${id}`)[0].innerHTML = newTitle;
            parent.getElementsByClassName(`description-data-${id}`)[0].innerHTML = newDescription;

            document.querySelector('#edit-education-time').value = '';
            document.querySelector('#edit-education-title').value = '';
            document.querySelector('#edit-education-description').value = '';

            tempBtn.remove();
            addBtn.style.display = 'block';
        })
    }

};

function addingReference(){
    let referenceTitle = $('#edit-reference-title').val();
    let referenceDescription = $('#edit-reference-description').val();

    var allCells = previewReferenceTable.querySelectorAll('tr');
    var allCellsLength = allCells.length;

    if(referenceTitle != '' && referenceDescription != ''){
        // create new tr and add to table
        let newTR = document.createElement('tr');
        newTR.className = 'single-reference';

        // create 2 divs with class names to style new element
        let descriptionDiv = document.createElement('div');
        let modifyDiv = document.createElement('div');
        let contentDiv = document.createElement('div');

        descriptionDiv.className = 'description-div';
        modifyDiv.className = 'modify-div';
        contentDiv.className = 'content-div-reference';

        let titleP = document.createElement('p');
        let descriptionP = document.createElement('p');

        titleP.className = `title-data-${allCellsLength}`;
        descriptionP.className = `description-data-${allCellsLength}`;

        titleP.classList.add('reference-title');
        descriptionP.classList.add('reference-description');

        titleP.classList.add('reference-title');
        descriptionP.classList.add('reference-description');

        titleP.setAttribute('id', `title-data-${allCellsLength}`);
        descriptionP.setAttribute('id', `description-data-${allCellsLength}`)

        // Delete and edit button for each job
        let editEducation = document.createElement('p');
        let deleteEducation = document.createElement('p');

        editEducation.innerHTML = 'EDIT';
        deleteEducation.innerHTML = 'X';

        editEducation.className = 'edit-reference-btn';
        deleteEducation.className = 'delete-reference-btn';

        editEducation.setAttribute('id',`${allCellsLength}`);
        newTR.setAttribute('id', `tr-${allCellsLength}`);

        titleP.innerHTML = referenceTitle;
        descriptionP.innerHTML = referenceDescription;

        modifyDiv.appendChild(editEducation);
        modifyDiv.appendChild(deleteEducation);
        descriptionDiv.appendChild(titleP);
        descriptionDiv.appendChild(descriptionP);
        
        contentDiv.appendChild(descriptionDiv);
        contentDiv.appendChild(modifyDiv);

        newTR.appendChild(contentDiv);

        previewReferenceTable.appendChild(newTR);

        // clear fields after adding
        document.querySelector('#edit-reference-title').value = '';
        document.querySelector('#edit-reference-description').value = '';

        return
    };
    if(referenceTitle == '' || referenceDescription == ''){
        alert('Fill in all the fields!');
        return;
    };
};

function modifyReference(){
    // get elem clicked on
    var element = event.target;
    var id = element.id;
    var classVal = element.className;

    var parent = element.parentNode;
    parent = parent.parentNode;
    parent = parent.parentNode;

    // delete
    if(classVal == 'delete-reference-btn'){
        parent.remove();
    }

    // edit
    if(classVal == 'edit-reference-btn' && !document.getElementById('temporary-id')){
        // get data
        let title = parent.getElementsByClassName(`title-data-${id}`)[0].innerHTML;
        let description = parent.getElementsByClassName(`description-data-${id}`)[0].innerHTML;

        // fill data into input fields for edit
        document.querySelector('#edit-reference-title').value = title;
        document.querySelector('#edit-reference-description').value = description;

        
        let addBtn = document.querySelector('#add-reference');
        addBtn.style.display = 'none';

        let tempBtn = document.createElement('p');
        tempBtn.id = 'temporary-id';
        tempBtn.innerHTML = 'SAVE';

        document.querySelector('.edit-reference-input').appendChild(tempBtn)

        // save updated data + restore button
        tempBtn.addEventListener('click', function(){
            let newTitle = document.querySelector('#edit-reference-title').value;
            let newDescription = document.querySelector('#edit-reference-description').value;

            parent.getElementsByClassName(`title-data-${id}`)[0].innerHTML = newTitle;
            parent.getElementsByClassName(`description-data-${id}`)[0].innerHTML = newDescription;

            document.querySelector('#edit-reference-title').value = '';
            document.querySelector('#edit-reference-description').value = '';

            tempBtn.remove();
            addBtn.style.display = 'block';
        })
    }

};


// Edit menu transitions
var buttons = document.querySelectorAll('.edit-container-nav-btn');
var editSections = document.querySelectorAll('.edit-input');

let btn0 = buttons[0];
let btn1 = buttons[1];
let btn2 = buttons[2];
let btn3 = buttons[3];
let btn4 = buttons[4];

let section0 = editSections[0];
let section1 = editSections[1];
let section2 = editSections[2];
let section3 = editSections[3];
let section4 = editSections[4];

// execute section interractions 
function switchRecord(btn){
    
    if(btn == btn0){
        hideSection(section1);
        hideSection(section2);
        hideSection(section3);
        hideSection(section4);
        openSection(section0);
        btn0.style.color = 'red';
        btn1.style.color = 'black';
        btn2.style.color = 'black';
        btn3.style.color = 'black';
        btn4.style.color = 'black';
    }

    if(btn == btn1){
        hideSection(section0);
        hideSection(section2);
        hideSection(section3);
        hideSection(section4);
        openSection(section1);
        btn0.style.color = 'black';
        btn1.style.color = 'red';
        btn2.style.color = 'black';
        btn3.style.color = 'black';
        btn4.style.color = 'black';
    }
    
    if(btn == btn2){
        hideSection(section0);
        hideSection(section1);
        hideSection(section3);
        hideSection(section4);
        openSection(section2);
        btn0.style.color = 'black';
        btn1.style.color = 'black';
        btn2.style.color = 'red';
        btn3.style.color = 'black';
        btn4.style.color = 'black';
    }
    
    if(btn == btn3){
        hideSection(section0);
        hideSection(section1);
        hideSection(section2);
        hideSection(section4);
        openSection(section3);
        btn0.style.color = 'black';
        btn1.style.color = 'black';
        btn2.style.color = 'black';
        btn3.style.color = 'red';
        btn4.style.color = 'black';
    }
    
    if(btn == btn4){
        hideSection(section0);
        hideSection(section1);
        hideSection(section2);
        hideSection(section3);
        openSection(section4);
        btn0.style.color = 'black';
        btn1.style.color = 'black';
        btn2.style.color = 'black';
        btn3.style.color = 'black';
        btn4.style.color = 'red';
    }
}

function hideSection(section){
    section.style.transitionDuration = '1s';
    section.style.transform = 'translateY(2000px)';
    section.style.display = 'none';
};

function openSection(section){
    section.style.transitionDuration = '1s';
    section.style.transform = 'translateY(0px)';
    section.style.display = 'flex';
};

btn0.addEventListener('click',function(){
    switchRecord(btn0);
})
btn1.addEventListener('click',function(){
    switchRecord(btn1);
})
btn2.addEventListener('click',function(){
    switchRecord(btn2);
})
btn3.addEventListener('click',function(){
    switchRecord(btn3);
})
btn4.addEventListener('click',function(){
    switchRecord(btn4);
})

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "Are you sure you want to leave or reload the page?";
  
    (e || window.event).returnValue = confirmationMessage; // Gecko + IE
    return confirmationMessage; // Webkit, Safari, Chrome etc.
});

// sending all data to server to generate result
document.querySelector('#save-pdf').addEventListener('click', function(){

    // Summary
    let summary = document.querySelector('#preview-summary').innerHTML;
    let tempSummary = [];

    tempSummary = summary.split('<br>');

    for(let i = 0; i < tempSummary.length; i++){
        tempSummary[i] = tempSummary[i].replace('\n','');
    };

    // getting skills
    let skillsList = document.querySelectorAll('.skill-cell');
    let skillsCollection = []
    for(let i = 0; i < skillsList.length; i++){
        skillsCollection.push(skillsList[i].innerHTML);
    };

    // getting data for experience section
    let experienceTimeCollection = document.querySelectorAll('.experience-time');
    let experienceTitleCollection = document.querySelectorAll('.experience-title');
    let experienceDescriptionCollection = document.querySelectorAll('.experience-description');

    let tempExperienceTime = [];
    let tempExperienceTitle = [];
    let tempExperienceDescription = [];
    let tempExperienceDescriptionResult = [];

    for(let i = 0; i < experienceTimeCollection.length; i ++){
        tempExperienceTime.push(experienceTimeCollection[i].innerHTML);
        tempExperienceTitle.push(experienceTitleCollection[i].innerHTML);
        tempExperienceDescription.push(experienceDescriptionCollection[i].innerHTML);
    }

    for(let i = 0; i < tempExperienceDescription.length; i++){
        let tempresult = tempExperienceDescription[i].split('<br>');

        tempExperienceDescriptionResult.push(tempresult);
    }

    for(let i = 0; i < tempExperienceDescriptionResult.length; i++){
        for(let k = 0; k < tempExperienceDescriptionResult[i].length; k++){
            tempExperienceDescriptionResult[i][k] = tempExperienceDescriptionResult[i][k].replace('\n','');
        }
    }


    // getting data for education section
    let educationTimeCollection = document.querySelectorAll('.education-time');
    let educationTitleCollection = document.querySelectorAll('.education-title');
    let EducationDescriptionCollection = document.querySelectorAll('.education-description');

    let tempEducationTime = [];
    let tempEducationTitle = [];
    let tempEducationDescription = [];

    for(let i = 0; i < educationTimeCollection.length; i ++){
        tempEducationTime.push(educationTimeCollection[i].innerHTML);
        tempEducationTitle.push(educationTitleCollection[i].innerHTML);
        tempEducationDescription.push(EducationDescriptionCollection[i].innerHTML);
    }


    // getting data for references
    let referenceTitleCollection = document.querySelectorAll('.reference-title');
    let referenceDescriptionCollection = document.querySelectorAll('.reference-description');

    let tempRefernceTitle = [];
    let tempRefernceDescription = [];

    for(let i = 0; i < referenceTitleCollection.length; i ++){
        tempRefernceTitle.push(referenceTitleCollection[i].innerHTML);
        tempRefernceDescription.push(referenceDescriptionCollection[i].innerHTML);
    }

    $.ajax({
        url: '/resume',
        type: 'GET',
        data: {
            // Get all data
    
            // Heading
            titleName: document.querySelector('#preview-name').innerHTML,
            birth: document.querySelector('.credentials-span-birth').innerHTML,
            address: document.querySelector('.credentials-span-address').innerHTML,
            phone: document.querySelector('.credentials-span-number').innerHTML,
            email: document.querySelector('.credentials-span-email').innerHTML,
    
            summary: tempSummary,
            skills: skillsCollection,

            experienceTimes: tempExperienceTime,
            experienceTitles: tempExperienceTitle,
            tempExperienceDescriptionResult: tempExperienceDescriptionResult,

            educationTimes: tempEducationTime,
            educationTitles: tempEducationTitle,
            educationDescriptions: tempEducationDescription,

            referenceTitles: tempRefernceTitle,
            referencedescriptions: tempRefernceDescription,
    
        },
        success: function(data){
            if(data.status == false){
                alert('Error');
            }
            if(data.status == true){
                let testSkills = data.skillsTable;
                window.location.href = '/result-display';
            }
        },
        error: function (request, status, error) {
            console.log(request.responseText);
        }
    })
});


// Create a pdf file from html
// TO ADD TABLE DATA => TAKE ALL INPUTS SEPARATLY AND ADD TO NEW TABLE (DO NOT TAKE WHOLE HTML SECTION AS INPUT)

// Create custom section creator, can choose category title etc..

// Add AI text generator