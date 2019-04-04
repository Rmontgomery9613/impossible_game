const container = document.getElementById('container');
const btnStart = document.querySelector('.btnStart');

btnStart.addEventListener('click',startGame);
document.addEventListener('keydown',pressKeyOn);
document.addEventListener('keyup',pressKeyOff);

//Game Variables
let animationGame;
let gamePlay = false;
let keys = {
	ArrowUp:false,
	ArrowDown:false,
	ArrowLeft:false,
	ArrowRight:false,
	w:false,
	a:false,
	s:false,
	d:false,
}
let player;
let randStartWall1;
let randStartWall2;
let moveRightWallTimer;
let moveLeftWallTimer;
let tempIndx = 0;
let tempIndx2 = 0;
let tmpX;
let tmpY;
let leftStartWall;
let rightStartWall;
let hasMoved = false;
let tempAllDivs;
let tempDropWalls;
let tempBullets;

function startGame(){
	hasMoved = false;
	tempIndx = 0;
	tempIndx2 = 0;
	randStartWall1 = Math.random() * 100 - 350;
	randStartWall2 = Math.random() * randStartWall1 - 80;
	container.innerHTML='';
	var div = document.createElement('div');
	div.setAttribute('class','player');
	div.setAttribute('id','player');
	setupMap();
	animationGame = requestAnimationFrame(playGame);
	container.appendChild(div);
	gamePlay = true;
	btnStart.style.display='none';
	player = {
		ele:div,
		x:48,
		y:760,
		speed:2.2,
		gameEndCounter:0,
	}
}

function setupMap(){
	let div = document.createElement('div');
	div.setAttribute('class','leftStartWall');
	div.classList.add('collision');
	div.style.left = '-370px';
	div.style.top = '550px';
	container.appendChild(div);
	
	moveRightWallTimer = randStartWall1 - div.offsetLeft;
	moveLeftWallTimer = randStartWall2 - div.offsetLeft;
	
	div = document.createElement('div');
	div.setAttribute('class','instructions');
	div.classList.add('collision');
	div.style.left = '370px';
	div.style.top = '580px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','rightStartWall');
	div.classList.add('collision');
	div.style.left = '100px';
	div.style.top = '550px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','horizontalBreak');
	div.classList.add('collision');
	div.style.left = '-50px';
	div.style.top = '480px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','rightSideWall');
	div.classList.add('collision');
	div.style.left = '620px';
	div.style.top = '40px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','rightSideWall2');
	div.classList.add('collision');
	div.style.left = '400px';
	div.style.top = '0px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','dropWall1');
	div.classList.add('collision');
	div.style.left = '650px';
	div.style.top = '140px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','dropWall2a');
	div.classList.add('collision');
	div.style.left = '650px';
	div.style.top = '240px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','dropWall2b');
	div.classList.add('collision');
	div.style.left = '750px';
	div.style.top = '240px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','dropWall3');
	div.classList.add('collision');
	div.style.left = '690px';
	div.style.top = '340px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','dropWall4a');
	div.classList.add('collision');
	div.style.left = '650px';
	div.style.top = '440px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','dropWall4b');
	div.classList.add('collision');
	div.style.left = '775px';
	div.style.top = '440px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','bullet0');
	div.classList.add('collision');
	div.direction = '';
	div.style.left = '440px';
	div.style.top = '55px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','bullet1');
	div.classList.add('collision');
	div.direction = 'right';
	div.style.left = '465px';
	div.style.top = '100px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','bullet2');
	div.classList.add('collision');
	div.direction = 'right';
	div.style.left = '490px';
	div.style.top = '145px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','bullet3');
	div.classList.add('collision');
	div.direction = 'right';
	div.style.left = '475px';
	div.style.top = '190px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','bullet4');
	div.classList.add('collision');
	div.direction = 'right';
	div.style.left = '430px';
	div.style.top = '235px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','bullet5');
	div.classList.add('collision');
	div.direction = 'right';
	div.style.left = '510px';
	div.style.top = '280px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','bullet6');
	div.classList.add('collision');
	div.direction = 'left';
	div.style.left = '530px';
	div.style.top = '325px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','bullet7');
	div.classList.add('collision');
	div.direction = 'right';
	div.style.left = '550px';
	div.style.top = '370px';
	container.appendChild(div);
	
	div = document.createElement('div');
	div.setAttribute('class','bullet8');
	div.classList.add('collision');
	div.direction = 'left';
	div.style.left = '490px';
	div.style.top = '415px';
	container.appendChild(div);
}

function playGame(){
	if (gamePlay) {
		if (hasMoved){
		//move start left/right wall
		leftStartWall = document.querySelectorAll('.leftStartWall');
		rightStartWall = document.querySelectorAll('.rightStartWall');
		//if (leftStartWall[0].offsetLeft < randStartWall){
		if (tempIndx < moveRightWallTimer){
			tempIndx++;
		tmpX = leftStartWall[0].offsetLeft;
		leftStartWall[0].style.left = (tmpX + 1.5) + 'px';
		tmpX = rightStartWall[0].offsetLeft;
		rightStartWall[0].style.left = (tmpX + 1.5) + 'px';
		}else{
			if (tempIndx2 < moveLeftWallTimer){
				tmpX = leftStartWall[0].offsetLeft;
				leftStartWall[0].style.left = (tmpX - 1.5) + 'px';
				tmpX = rightStartWall[0].offsetLeft;
				rightStartWall[0].style.left = (tmpX - 1.5) + 'px';
				tempIndx2++;
			}		
		}
		}
		//dropping walls
		tempDropWalls = document.querySelectorAll("[class^='dropWall']");
		for (let k=0;k<tempDropWalls.length;k++){
			if (tempDropWalls[k].offsetTop > 460){ //reset at top position
				tempDropWalls[k].style.top = '60px';
			}else{ // drop wall down
				tmpY = tempDropWalls[k].offsetTop;
				tempDropWalls[k].style.top = (tmpY + 1.2) + 'px';
			}
			
		}
		
		//dropping walls
		tempBullets = document.querySelectorAll("[class^='bullet']");
		for (let j=0;j<tempBullets.length;j++){
			if (tempBullets[j].direction == 'right'){ // going right
				if (tempBullets[j].offsetLeft > 610){ //change direction
					tempBullets[j].direction = 'left';
				}else{ // move bullet
					tmpX = tempBullets[j].offsetLeft + 3;
					tempBullets[j].style.left = tmpX + 'px';
				}
			}else{ // going left
				if (tempBullets[j].offsetLeft < 430){ //change direction
					tempBullets[j].direction = 'right';
				}else{ // move bullet
					tmpX = tempBullets[j].offsetLeft - 3;
					tempBullets[j].style.left = tmpX + 'px';
				}
			}		
		}
		
		//movement		
		if(keys.ArrowUp || keys.w){
			hasMoved = true;
			if (player.y > 0){ player.y -= player.speed; }
		}
		if(keys.ArrowDown || keys.s){
			hasMoved = true;
			if (player.y < 770 ){ player.y += player.speed; }
		}
		if(keys.ArrowLeft || keys.a){	
			hasMoved = true;
			if (player.x > 0){ player.x -= player.speed; }
		}
		if(keys.ArrowRight || keys.d){
			hasMoved = true;
			if (player.x < 770) { player.x += player.speed; }
		}
				
		player.ele.style.top = player.y + 'px';
		player.ele.style.left = player.x + 'px';
		
		//check collision
		tempAllDivs = document.querySelectorAll("div.collision");
		for (let i=0;i<tempAllDivs.length;i++){
			gameOver = checkCollision(tempAllDivs[i]);
			if (gameOver){
				player.gameEndCounter = 1;
				break;
			}
		}

	}
	animationGame = requestAnimationFrame(playGame);
	if (player.gameEndCounter>0){ // game is over, out of lives
		//player.y=(player.y>60)?player.y-30:60;
			gamePlay = false;
			btnStart.style.display = 'block';
			cancelAnimationFrame(animationGame);
			gameOverPlay();
		}
	}


function checkCollision(b){
	let bRect = b.getBoundingClientRect(); 
	let aRect = player.ele.getBoundingClientRect(); 
		return !((aRect.bottom < bRect.top + 2) || 
		(aRect.top + 2 > bRect.bottom) || 
		(aRect.right < bRect.left + 2) || 
		(aRect.left + 1 > bRect.right));
}

function gameOverPlay(){
	let div = document.createElement('div');
	div.setAttribute('class','gameOver');
	div.innerHTML = 'GAME OVER';
	container.appendChild(div);
	player.speed = 0;
}

function pressKeyOn(event){
	event.preventDefault();
	keys[event.key] = true;
}

function pressKeyOff(event){
	event.preventDefault();
	keys[event.key] = false;
}