var myGamePiece;
var myObstacles = [];
var myScore;
var mySound,
	myBGMusic;
function startGame() {
	myBGMusic = new sound("maliya.mp3");
	mySound = new sound("1.mp3");
	myBGMusic.play();
	myGamePiece = new component(30,30,"smiley.gif", 10, 120, "image");
	//myObstacle = new component(10,200 ,"green", 300, 120);
	myScore = new component("30px", "consolas","black",280,40,"text");
	myBG = new component(656,270,"citymarket.jpg", 0, 0 ,"background");
	myGameArea.start();
}

var myGameArea = {
	canvas: document.createElement("canvas"),
	start: function() {
		this.canvas.width= 480;
		this.canvas.height = 270;
		this.canvas.style.cursor = "none";
		this.context = this.canvas.getContext('2d');
		this.frameNo = 0;
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea,20);
		
		/*	window.addEventListener("touchmove",function(e){
			myGameArea.x = e.touches[0].screenX;
			myGameArea.y = e.touches[0].screenY;
		})
	window.addEventListener("mousemove",function(e){
			myGameArea.x = e.pageX;
			myGameArea.y = e.pageY;
		})
		window.addEventListener("keydown",function(e){
			myGameArea.keys = (e.keyCode || []);
			myGameArea.keys[e.keyCode] = true;
		})

		window.addEventListener('keyup', function(e) {
			myGameArea.keys[e.keyCode] = false;
		})*/
	},
	clear: function(){
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	},
	stop: function() {
		clearInterval(this.interval);
	}
}

function everyinterval(n){
	if((myGameArea.frameNo / n)%1 == 0){ return true;

	}
	return false;
}

function component(width, height, color, x, y, type){
	this.type = type;
	if(this.type == "image" || this.type == "background"){
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.gravity = 0.05;
	this.gravitySpeed = 0;
	this.bounce = 0.6;
	this.update = function(){	
		 ctx = myGameArea.context;
		if(this.type ==  "text"){
		ctx.font = this.width+ " " + this.height;
		ctx.fillStyle = color;
		ctx.fillText(this.text, this.x, this.y);
	}
	 if(this.type == "image" || type == "background"){
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		if (type == "background") {
			ctx.drawImage(this.image, this.x+ this.width, this.y,this.width,this.height);
		}
	}else{
		ctx.fillStyle = color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	
}

	this.newPos = function(){
			if (this.gravitySpeed > 1.5) {
			this.gravitySpeed -= 0.5;
		}
		this.gravitySpeed += this.gravity;


		this.x += this.speedX;
		this.y += this.speedY+ this.gravitySpeed;

		if (this.type == "background") {
			if(this.x == -(this.width)){
				this.x = 0;
			}
		}
		this.hitBottom();

	}

	this.hitBottom = function(){
		var myBottom = myGameArea.canvas.height - this.height;
		if(this.y > myBottom){
			this.y = myBottom;
			this.gravitySpeed = - (this.gravitySpeed*this.bounce);
		}
	}

	this.crashWith = function(otherobj) {
		var myleft = this.x,
			myright = this.x+ (this.width),
			mytop = this.y,
			mybottom = this.y+ (this.height),
			otherleft = otherobj.x,
			otherright = otherobj.x + (otherobj.width),
			othertop = otherobj.y,
			otherbottom = otherobj.y +(otherobj.height),
			crash = false;
if ((mybottom >= othertop) && (mytop <= otherbottom) && ( myright >= otherleft) && (myleft <= otherright)) {crash = true;}
/*
		if((mybottom < othertop) || (mytop > otherbottom) ||  (myright < otherleft) ||
               (myleft > otherright)){
			
		}*/
		return crash;

	}
}

var updateGameArea = function (){
	var x, y;
	for (var i =0; i<myObstacles.length; i+=1) {
		if(myGamePiece.crashWith(myObstacles[i])){
			mySound.play();
			myBGMusic.stop();
			myGameArea.stop();
			return;
		}
		}
		myBG.speedX = -1;
		myGameArea.clear();	
		myBG.newPos();
		myBG.update()
		myGameArea.frameNo += 1;
		if(myGameArea.frameNo ==1 || everyinterval(150)){
			x = myGameArea.canvas.width;
			//y = myGameArea.canvas.height - 200;
			//random height
			minHeight = 20;
			maxHeight = 200;
			height = Math.floor(Math.random()*(maxHeight-minHeight+1) + minHeight );

			minGap = 50;
			maxGap = 200;
			gap = Math.floor(Math.random()* (maxGap - minGap +1)+ minGap);


			myObstacles.push(new component(10,height ,"green", x, 0));
			myObstacles.push(new component(10, x-height-gap, "green", x, height+ gap));
		}

		for(i = 0;i<myObstacles.length;i++){
			myObstacles[i].x += -1;
			myObstacles[i].update();
		}

		myScore.text = "Score: " + myGameArea.frameNo;
		myScore.update();
		//this.hitBottom();
		myGamePiece.newPos();

		//myObstacle.update();
		myGamePiece.update();
	
		
		//stopMove();

		/*if(myGameArea.touchX && myGameArea.touchY){
		myGamePiece.x = myGameArea.x;
		myGamePiece.y = myGameArea.y;
	}
if(myGameArea.x && myGameArea.y){
		myGamePiece.x = myGameArea.x;
		myGamePiece.y = myGameArea.y;
	}
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
	if(myGameArea.keys && myGameArea.keys[37]){
		myGamePiece.speedX  = -1;
	}
		if(myGameArea.keys && myGameArea.keys[39]){
		myGamePiece.speedX  = 1;
	}
		if(myGameArea.keys && myGameArea.keys[38]){
		myGamePiece.speedY  = -1;
	}
	if(myGameArea.keys && myGameArea.keys[40]){
		myGamePiece.speedY  = 1;
	}
	myGamePiece.newPos();*/
	//myGamePiece.stopMove();

}

function move(dir){
	myGamePiece.image.src = "angry.gif";
	if(dir=="up") myGamePiece.speedY -= 1;
	if (dir=="down") {myGamePiece.speedY += 1;}
	if (dir=="left") {myGamePiece.speedX -= 1;}
	if (dir=="right") {myGamePiece.speedX += 2;}
}


function stopMove() {
	myGamePiece.image.src ="smiley.gif";
	myGamePiece.speedY = 0;
	myGamePiece.speedX = 0;
}

function sound(src){
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display="none";
	document.body.appendChild(this.sound);
	this.play = function() {
		this.sound.play();
	}

	this.stop = function(){
		this.sound.pause();
	}
}

function acl(n){
	if (!(myGameArea.interval)) {
	 myGameArea.interval = setInterval(myGamePiece, 20);
	}
	myGamePiece.gravity = n;
}

startGame();