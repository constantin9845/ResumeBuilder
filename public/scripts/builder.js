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
const navBar = document.querySelector('.nav-bar');

const saveCredentials = document.querySelector('#save-credentials');


// Run CV Template Set up
var totalArr = [];
for (let i = 0; i < allTemplates.length; i++) {
    totalArr.push(allTemplates[i]);
    totalArr.push(allTemplateImages[i]);
    totalArr.push(allTemplateP[i]);
};

function runSetUp(){
    // SET UP POP UP
    buildView.style.display = 'none';
    var templateSelected = undefined;

    navBar.style.zIndex = '0';

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
                    // Check if a link element with class 'template-style' already exists
                    let existingLink = document.querySelector('.template-style');
                    if (existingLink) {
                        // If a link element already exists, update the href attribute and return
                        existingLink.href = `/css/template${template}.css`;
                        return;
                    }
                    if(!existingLink){
                        // Create the link element
                        var link = document.createElement("link");
                        link.className = 'template-style'
                        link.href = `/css/template${template}.css`;
                        link.rel = "stylesheet";
                    
                        fetch(link.href)
                            .then(response =>{
                                if(response.ok){
                                    // Add the link element to the head of the HTML document
                                    document.head.appendChild(link);
                                    return;
                                }
                                else{
                                    console.log("template does not exist yet");
                                    return
                                }   
                            });
                    }
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

                // STYLE ADJUSTMENTS FOR DIFFERENT TEMPLATES
                if(templateSelected == 2){
                    document.querySelector('#preview-birth').innerHTML = '';
                    document.querySelector('#preview-address').innerHTML = '';
                    document.querySelector('#preview-number').innerHTML = '';
                    document.querySelector('#preview-email').innerHTML = '';

                    let temp1 = document.querySelector('.credentials-span-birth').innerHTML;
                    document.querySelector('.credentials-span-birth').innerHTML = `${temp1}  &#127874;`;

                    let temp2 = document.querySelector('.credentials-span-address').innerHTML;
                    document.querySelector('.credentials-span-address').innerHTML = `${temp2}  &#128205;`;

                    let temp3 = document.querySelector('.credentials-span-number').innerHTML;
                    document.querySelector('.credentials-span-number').innerHTML = `${temp3}  &#128222;`;

                    let temp4 = document.querySelector('.credentials-span-email').innerHTML;
                    document.querySelector('.credentials-span-email').innerHTML = `${temp4}  &#128231;`;


                }
                if(templateSelected == 1 || templateSelected == 3 || templateSelected == 4){
                    document.querySelector('#preview-birth').innerHTML = 'Date of Birth';
                    document.querySelector('#preview-address').innerHTML = 'Address';
                    document.querySelector('#preview-number').innerHTML = 'Number';
                    document.querySelector('#preview-email').innerHTML = 'Email';

                    document.querySelector('.credentials-span-birth').innerHTML = myBirth;
                    document.querySelector('.credentials-span-address').innerHTML = myAddress;
                    document.querySelector('.credentials-span-number').innerHTML = myNumber;
                    document.querySelector('.credentials-span-email').innerHTML = myEmail;

                }

                navBar.style.zIndex = '9999';

                return;
    
            })
            return templateSelected;
        })
    };
}

window.addEventListener('load', function(){
    runSetUp();
});

// RECALL SET UP POP UP
const editCredentialsBtn = document.querySelector('.edit-credentials-nav-btn');
editCredentialsBtn.addEventListener('click', function(){

    // remove previous css file attached

    navBar.style.zIndex = '0';

    // delete the link element
    var link = document.querySelectorAll('.template-style');

    if(link) {
        for(let i = 0; i < link.length; i++){
            // delete template
            link[i].remove();
            console.log('Deleted all Previous css file');
        }

    } else {
        // Template does not exist
    }     

    setupPopUp.style.display = 'unset';
    setup1.style.display = 'unset';
    setup2.style.display = 'none';
});


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

// Generating text with openAI

// 1. Open window - Based on where opened - fill in text
let openGenerateBtn = document.querySelector('#generate-summary');
let generateWindow = document.querySelector('.text-generator-container');
let closeGenerateBtn = document.querySelector('#close-generate-btn');
let submitGenerate = document.querySelector('#submit-generate');
let generateInput = document.querySelector('#generator-input');
let editSummary = document.querySelector('#edit-summary');

openGenerateBtn.addEventListener('click', function(){
    generateWindow.style.transitionDuration = '0.3s'
    generateWindow.style.transform = 'translateX(0px)';
    generateWindow.style.opacity = '1';
});

closeGenerateBtn.addEventListener('click', function(){
    generateWindow.style.transitionDuration = '0.3s'
    generateWindow.style.transform = 'translateX(-2000px)';
    generateWindow.style.opacity = '0';
});

document.querySelector('.loader').style.display = 'none';

// toggle edit and preview with button on smaller devices
const toggleBtn = document.querySelector('.toggle-editor');
const toggleData = document.querySelector('#toggle-data');
const editContainer = document.querySelector('.edit-container');
const previewContainer = document.querySelector('.preview-container');

toggleBtn.addEventListener('click', function(){
    // determine current state

    let x = window.getComputedStyle(previewContainer).getPropertyValue('width')

    // edit is on
    if(x == '0px'){
        editContainer.style.transitionDuration = '0.4s'
        editContainer.style.width = '0%';
        editContainer.style.opacity = '0';

        previewContainer.style.transitionDuration = '0.4s'
        previewContainer.style.width = '100%';

        toggleData.innerHTML = 'Edit';
    }

    // preview is on
    if(x != '0px'){
        previewContainer.style.transitionDuration = '0.4s'
        previewContainer.style.width = '0%';

        editContainer.style.opacity = '1';
        editContainer.style.transitionDuration = '0.4s'
        editContainer.style.width = '100%';

        toggleData.innerHTML = 'Preview';
    }
})

submitGenerate.addEventListener('click', function(){
    let input = generateInput.value;

    if(input == ''){
        alert('Fill in the description!');
        return;
    }
    let temp  = `Write me a resume description, please give me a text without listing items/subjects. here are some details about me: `;

    let test = temp + input;

    $.ajax({
        url: '/Generate-text',
        type: 'GET',
        data: { generateData : test},
        beforeSend: function() {
            document.querySelector('.loader').style.display = 'block'
        },
        complete: function() {
            document.querySelector('.loader').style.display = 'none'
        },
        success: function(data){
            if(data.status == false){
                alert('Error');
            }
            if(data.status == true){
                editSummary.value = data.generatedText;
                generateInput.value = '';
                generateWindow.style.transitionDuration = '0.3s'
                generateWindow.style.transform = 'translateX(-2000px)';
                generateWindow.style.opacity = '0';

            }
        },
        error: function (request, status, error) {
            console.log(request.responseText);
        }
    })

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

    // Check what template was selected to apply the styling
    var link = document.querySelector('.template-style').href
    let templateChosen;

    if(link.includes('http://localhost:3060/css/')){
        // link for local version

        switch(link) {
            case 'http://localhost:3060/css/template1.css':
                templateChosen = 1;
                break;
            case 'http://localhost:3060/css/template2.css':
                templateChosen = 2;
                break;
            case 'http://localhost:3060/css/template3.css':
                templateChosen = 3;
                break;
            case 'http://localhost:3060/css/template4.css':
                templateChosen = 4;
                break;
        }
    }

    if(link.includes('https://cv-craft.herokuapp.com/css/')){
        // link for local version

        switch(link) {
            case 'https://cv-craft.herokuapp.com/css/template1.css':
                templateChosen = 1;
                break;
            case 'https://cv-craft.herokuapp.com/css/template2.css':
                templateChosen = 2;
                break;
            case 'https://cv-craft.herokuapp.com/css/template3.css':
                templateChosen = 3;
                break;
            case 'https://cv-craft.herokuapp.com/css/template4.css':
                templateChosen = 4;
                break;
        }
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

            templateChosen : templateChosen,
    
        },
        beforeSend: function() {
            document.querySelector('.loader').style.display = 'block'
        },
        complete: function() {
            document.querySelector('.loader').style.display = 'none'
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

// 
// 
// RESPONSIVENESS MACBOOK SIZE DONE
// 
// 
// 