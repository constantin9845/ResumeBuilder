const inputId = '#edit-summary'
const outputId = document.querySelector('#preview-summary');

function textPreviewer(input,output){
    let data = $(input).val();

    output.innerHTML = data;
};

document.querySelector('#edit-summary').addEventListener('keyup', ()=>{
    textPreviewer(inputId,outputId)
});


const addSkill = document.querySelector('#add-skill');
const addExperience = document.querySelector('#add-experience');

const editSkill = document.querySelector('#edit-skill');
const editExperienceTime = document.querySelector('#edit-experience-time');
const editExperienceTitle = document.querySelector('#edit-experience-title');
const editExperiencedescription = document.querySelector('#edit-experience-description');

const previewSkillTable = document.querySelector('.preview-skills-table');
const previewExperienceTable = document.querySelector('.preview-experience-table');
const previewSkillTableElems = previewSkillTable.querySelectorAll('td');

addSkill.addEventListener('click', function(){
    addingSkill();
    editSkill.value = '';
});

addExperience.addEventListener('click', function(){
    addingExperience();
    editExperienceTime.value = '';
    editExperienceTitle.value = '';
    editExperiencedescription.value = '';
})

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
}

function deleteSkill(){
    document.querySelector('.preview-skills-table').addEventListener("click", function(event) {
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
    });
}

function addingExperience(){
    let rows = previewExperienceTable.rows; 
    let time = $('#edit-experience-time').val();
    let jobTitle = $('#edit-experience-title').val();
    let jobDescription = $('#edit-experience-description').val();

    if(time != '' && jobTitle != '' && jobDescription != ''){
        // create new tr and add to table
        let newTR = document.createElement('tr');
        newTR.className = 'single-job';

        // create 4 divs with class names to style new element
        let timeDiv = document.createElement('div');
        let contentDiv = document.createElement('div');
        let titleDiv = document.createElement('div');
        let descriptionDiv = document.createElement('div');

        let timeP = document.createElement('p');
        let titleP = document.createElement('p');
        let descriptionP = document.createElement('p');

        timeP.innerHTML = time;
        titleP.innerHTML = jobTitle;
        descriptionP.innerHTML = jobDescription;

        timeDiv.appendChild(timeP);
        titleDiv.appendChild(titleP);
        descriptionDiv.appendChild(descriptionP);

        timeDiv.className = 'time-div';
        contentDiv.className = 'content-div';
        titleDiv.className = 'title-div';
        descriptionDiv.className = 'description-div';

        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(descriptionDiv);

        newTR.appendChild(timeDiv);
        newTR.appendChild(contentDiv);

        previewExperienceTable.appendChild(newTR);

        return
    }
    if(time == '' && jobTitle == '' && jobDescription == ''){
        alert('Fill in all the fields!');
        return;
    }
}

deleteSkill()




// Editing existing job => on click => fill edit fields with data => on save updated data => delete old one first => add new => ON SAME LOCATION
// DELETING JOBS + STYLING