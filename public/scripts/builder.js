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
const editSkill = document.querySelector('#edit-skill');
const previewSkillTable = document.querySelector('.preview-skills-table');
const previewSkillTableElems = previewSkillTable.querySelectorAll('td');

addSkill.addEventListener('click', function(){
    addingSkill();
})

function addingSkill(){
    let rows = previewSkillTable.rows; 
    var lastRow = rows.item(rows.length - 1);

    let data = $('#edit-skill').val();


    // check if field is not empty
    if(data != ''){

        // check if any rows already exist
        if(rows.length == 1){

            // check if last row already has 3 td or not
            if(previewSkillTable.rows[0].cells.length == 3){
                // add new row first
                let newTR = document.createElement('tr');
                previewSkillTable.appendChild(newTR);

                let lastRow = rows[rows.length - 1];

                let newTD = document.createElement('td');
                newTD.innerHTML = data;
                lastRow.appendChild(newTD);
            }

            if(previewSkillTable.rows[0].cells.length < 3){
                let newTD = document.createElement('td');
                newTD.innerHTML = data;
                lastRow.appendChild(newTD);
            }
        }

        if(rows.length > 1){
            if(lastRow == 3){
                // add new row first
                let newTR = document.createElement('tr');
                previewSkillTable.appendChild(newTR);

                lastRow = rows[rows.length - 1];

                let newTD = document.createElement('td');
                newTD.innerHTML = data;
                lastRow.appendChild(newTD);
            }

            if(lastRow < 3){
                let newTD = document.createElement('td');
                newTD.innerHTML = data;
                lastRow.appendChild(newTD);
            }
        }

        if(rows.length == 0){
            let newTR = document.createElement('tr');
            previewSkillTable.appendChild(newTR);

            let newTD = document.createElement('td');
            newTD.innerHTML = data;
            rows.item(0).appendChild(newTD);
        }

        // got to last row in table and append new child there
        const newTD = document.createElement('td');
        newTD.innerHTML = data;

    }
    if(data == ''){
        alert('Add a skill!')
    };
}


// not getting past input 4
// 