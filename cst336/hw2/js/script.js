// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

//Global variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ4Choices();
display4FlagChoices();

//Functions

function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i = 0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML +=
            `<input type="radio" name="q4" id="${q4ChoicesArray[i]}" 
            value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
    }
} //displayQ4Choices

function display4FlagChoices() {
    let q10ChoicesArray = ["Arizona", "New Mexico", "Texas", "Tennessee"];
    q10ChoicesArray = _.shuffle(q10ChoicesArray);
    for(let i = 0; i < q10ChoicesArray.length;i++) {
        document.querySelector("#q10Choices").innerHTML +=
        `<input type = "radio" name="q10" id = "${q10ChoicesArray[i]}"
        value="${q10ChoicesArray[i]}"> <label for="${q10ChoicesArray[i]}"> <img src = "img/${q10ChoicesArray[i]}.png" alt = "${q10ChoicesArray[i]} state flag"
        style="width:150px;" > </label>`;
    }
} //display4FlagChoices

function isFormValid() {
    let isValid = true;
    if (document.querySelector("#q1").value == "") {
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
    }
    return isValid;
} //isFormValid

function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png'>";
    score += 10;
}

function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz() {
    console.log("Grading quiz..")
    document.querySelector("#validationFdbk").innerHTML = ""; //resets validation feedback
    if (!isFormValid()) {
        return;
    }

    //variables
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    console.log(q1Response);
    let q2Response = document.querySelector("#q2").value;
    console.log(q2Response);
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q5Response = document.querySelector("input[name=q5]:checked").value;
    let q6Response = document.querySelector("#statesCount").value;
    let q7Response = document.querySelector("#q7").value.toLowerCase();
    let q9Response = document.querySelector("#q9").value;
    let q10Response = document.querySelector("input[name=q10]:checked").value;

    //Grading question 1
    if (q1Response == "sacramento") {
        rightAnswer(1);
    }
    else {
        wrongAnswer(1);
    }

    //Grading question 2
    if (q2Response == "mo") {
        rightAnswer(2);
    }
    else {
        wrongAnswer(2);
    }

    //Grading question 3
    if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    }
    else {
        wrongAnswer(3);
    }

    //Grading question 4
    if (q4Response == "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    //Grading question 5
    if (q5Response == "True") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    //Grading question 6
    if (q6Response == 50) {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    //Grading question 7
    if (q7Response == "lake superior") {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    //Grading Question 8
    if (document.querySelector("#Massachusetts").checked && document.querySelector("#Vermont").checked
    && !document.querySelector("#NewYork").checked && !document.querySelector("#Pennsylvania").checked) {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    //Grading Question 9
    if(q9Response == "NewJersey"){
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    //Grading Question 10
    if(q10Response == "Arizona"){
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }




    
    totalScore = document.querySelector("#totalScore");
    totalScore.textContent = `Total Score: ${score}`;
    
    //score should be red if under 80, green otherwise
    if (score < 80) {
        totalScore.className = "text-danger";
        document.querySelector("#successMessage").textContent = "";
    } else {
        totalScore.className = "text-success";
        document.querySelector("#successMessage").textContent = 'Congratulations on a score equal or greater than 80!';
    }

    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);
}
//gradeQuiz