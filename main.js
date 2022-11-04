song ="";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function setup(){
    canvas = createCanvas(600,450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide() ;

    posenet = ml5.poseNet(video,modelLoaded);

    posenet.on('pose',gotResults);
}

function draw(){
    image(video,0,0,600,450);
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreleftwrist>0.2){
    circle(leftWristx,leftWristy,20);

    numberlefty = Number(leftWristy);
    cnumberlefty = floor(numberlefty);
    volume = cnumberlefty/500;
    song.setVolume(volume);
    document.getElementById("vm").innerHTML = "Volume = " + volume;
    }

    if(scorerightwrist > 0.2){
    circle(rightWristx,rightWristy,20);

    if(rightWristy>0 && rightWristy<=100){
        document.getElementById("sp").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristy>100 && rightWristy<=200){
        document.getElementById("sp").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristy>200 && rightWristy<=300){
        document.getElementById("sp").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristy>300 && rightWristy<=400){
        document.getElementById("sp").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristy>400 && rightWristy<=500){
        document.getElementById("sp").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("model is loaded");
}
function gotResults(results){
    if (results.length > 0)
    {
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftwristx = "+ leftWristx+ " leftwristy = "+leftWristy);
        scoreleftwrist = results[0].pose.keypoints[9].score;

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightwristx = "+ rightWristx+ " rightwristy = "+rightWristy);
        scorerightwrist = results[0].pose.keypoints[10].score;

        
    }
}
