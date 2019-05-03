let canvas;
let score;
let button;
let initialInput;
let submitButton;
// let database =  firebase.database();



function setup(){
    canvas = createCanvas(100, 100);
    canvas.parent('game');
    score = 0;
    createP('click the canvas to get points').parent('game');
    button = createButton('click');
    button.parent('game');
    button.mousePressed(increaseScore);
    initialInput = createInput('initials');
    initialInput.parent('game');
    submitButton = createButton('submit');
    submitButton.parent('game');
    submitButton.mousePressed(submitScore);
}

function increaseScore(){
    score++;
}
function draw(){
    background(0);
    textAlign(CENTER);
    textSize(32);
    fill(255);
    text(score, width / 2, height / 2);
}

function submitScore(){
    let data = {
        initials: initialInput.value(),
        score: score
    }
    let database =  firebase.database();
    let ref = database.ref('scores');
    let result = ref.push(data);
    result;
}




var config = {
    apiKey: "AIzaSyBw8Jaoa_aoVqKWBv-AVTc2U61cUhn6Ews",
    authDomain: "firstproject-4622a.firebaseapp.com",
    databaseURL: "https://firstproject-4622a.firebaseio.com",
    projectId: "firstproject-4622a",
    storageBucket: "firstproject-4622a.appspot.com",
    messagingSenderId: "864749837314"
};

firebase.initializeApp(config);
let database =  firebase.database();

let ref = database.ref('scores');
ref.on('value', gotData, errData);

function gotData(data){
    let scorelist = selectAll('.scoreListing');
    for(var i = 0; i<scorelist.length; i++){
        scorelist[i].remove()
    }
    // console.log(data.val());
    let scores = data.val();
    let keys = Object.keys(scores);
    for(var i = 0; i < keys.length; i++){
        var k = keys[i];
        var initials = scores[k].initials;
        var scoreVal = scores[k].score;
        let li = createElement('li', initials + ': ' + scoreVal)
        li.class('scoreListing');
        li.parent('scorelist');
    }
}

function errData(err){
    console.log('error');
    console.log(err);
}



