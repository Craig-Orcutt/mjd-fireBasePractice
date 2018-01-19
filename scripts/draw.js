let database;
let drawing = [];
let currentPath = [];
let isDrawing = false;



function setup(){
    canvas = createCanvas(200, 200);
    canvas.mousePressed(startPath);
    canvas.parent('canvasContainer');


    let saveButton = select('#saveButton');
    saveButton.mousePressed(saveDrawing);

let config = {
    apiKey: "AIzaSyBw8Jaoa_aoVqKWBv-AVTc2U61cUhn6Ews",
    authDomain: "firstproject-4622a.firebaseapp.com",
    databaseURL: "https://firstproject-4622a.firebaseio.com",
    projectId: "firstproject-4622a",
    storageBucket: "firstproject-4622a.appspot.com",
    messagingSenderId: "864749837314"
};

firebase.initializeApp(config);
database = firebase.database();

let ref = database.ref('drawings');
ref.on('value', gotData, errData);
}

function startPath(){
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
    canvas.mouseReleased(endPath);
}

function endPath() {
    isDrawing = false;
}

function draw(){
    background(0);

    if(isDrawing){
        let point = {
            x: mouseX,
            y: mouseY
        }
        currentPath.push(point);
    }
    stroke(255);
    strokeWeight(4);
    noFill();
    for (let i =0; i < drawing.length; i++){
        let path =  drawing[i];
        beginShape();
        for (let j =0; j < path.length; j++){
            vertex(path[j].x , path[j].y)
        }
        endShape();
    }
}

function saveDrawing () {
    let ref = database.ref('drawings');
    ref.push(drawing);
    data = {
        name: "Jim",
        drawing: drawing
    }
    let result = ref.push(data, dataSent); 
    console.log(result.key);
}

function dataSent(status){
    console.log('what are you', status);
}


function gotData(data){
    let drawings = data.val();
    let keys = Object.keys(drawings);
    for(let i = 0; i < keys.length; i++){
        let key = keys[i]; 
        // console.log('key', key);
        let li = createElement('li', key);
        li.parent('drawingList');
        

        
    }

}

function errData(err){
    console.log('error', err);
    
}