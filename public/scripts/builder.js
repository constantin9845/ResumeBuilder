const inputId = '#edit-summary'
const outputId = document.querySelector('#preview-summary');

function textPreviewer(input,output){
    let data = $(input).val();
    let temp;

    output.innerHTML = data;
    output.style.textAlign = 'center';

    document.querySelector('#edit-summary').addEventListener('keyup', (event)=>{
        if(event.key === 'Enter'){
            temp = true;
            return;
        };
    });

    if(temp == true){
        output.innerHTML += '<br>';
        temp = false;
    };
};

document.querySelector('#edit-summary').addEventListener('keyup', ()=>{
    textPreviewer(inputId,outputId)
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
    let data = $('#edit-skill').val();

    // check if field is not empty
    if(data != ''){
        // check if any rows already exist
        if(rows.length == 0){
            // make a new tr elem
            let newTR = document.createElement('tr');
            previewSkillTable.appendChild(newTR);

            let newTD = document.createElement('td');
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
                previewSkillTable.appendChild(newTR);

                lastRow = rows.item(rows.length - 1);

                let newTD = document.createElement('td');
                newTD.innerHTML = data;
                lastRow.appendChild(newTD);

                newTD.setAttribute("id",`${allCellsLength}`);

                return;
            }

            if(lastRow.children.length < 3){
                let newTD = document.createElement('td');
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
        newTR.className = 'single-job';

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

        editJob.innerHTML = 'E';
        deleteJob.innerHTML = 'X';

        editJob.className = 'edit-job-btn';
        deleteJob.className = 'delete-job-btn';

        editJob.setAttribute('id',`${allCellsLength}`);
        newTR.setAttribute('id', `tr-${allCellsLength}`);

        timeP.className = `time-data-${allCellsLength}`;
        titleP.className = `title-data-${allCellsLength}`;
        descriptionP.className = `description-data-${allCellsLength}`;

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
    if(classVal == 'edit-job-btn'){
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

        editEducation.innerHTML = 'E';
        deleteEducation.innerHTML = 'X';

        editEducation.className = 'edit-education-btn';
        deleteEducation.className = 'delete-education-btn';

        editEducation.setAttribute('id',`${allCellsLength}`);
        newTR.setAttribute('id', `tr-${allCellsLength}`);

        timeP.className = `time-data-${allCellsLength}`;
        titleP.className = `title-data-${allCellsLength}`;
        descriptionP.className = `description-data-${allCellsLength}`;

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
    if(classVal == 'edit-education-btn'){
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
        newTR.className = 'single-ereference';

        // create 2 divs with class names to style new element
        let descriptionDiv = document.createElement('div');
        let modifyDiv = document.createElement('div');
        let contentDiv = document.createElement('div');

        descriptionDiv.className = 'description-div';
        modifyDiv.className = 'modify-div';
        contentDiv.className = 'content-div';

        let titleP = document.createElement('p');
        let descriptionP = document.createElement('p');

        titleP.className = `title-data-${allCellsLength}`;
        descriptionP.className = `description-data-${allCellsLength}`;

        // Delete and edit button for each job
        let editEducation = document.createElement('p');
        let deleteEducation = document.createElement('p');

        editEducation.innerHTML = 'E';
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
    if(classVal == 'edit-reference-btn'){
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




// 
// JOBS STYLING

// Add AI text generator