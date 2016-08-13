//Robot setup
var robotPosX = 0;
var robotPosY = 0;
var robotDir = 'n';
var dirList = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
var robotInt = false; //Flag to make sure place is the first command used

//Simple logger
function log(msg) {
	console.log(msg);
}

//Numeric validation
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//Check the position of robot and validate input
function posCheck(pos, axis = '') {
	if(!isNumeric(pos))
	{
		if (axis != '')
			log('Invalid '+ axis +' position, must be a number within 0 to 5');			
		return false;
	}
	else if(pos < 0 || pos > 5)
	{		
		if (axis != '')
			log('Invalid '+ axis +' position, must be a number within 0 to 5');
		return false;
	}
	return true;	
}

//Check the direction of robot and validate input
function dirCheck(dir) {
	if(/^[a-zA-Z]+$/.test(dir))
	{
		for (var i = 0; i < dirList.length; i++)
		{			
			var value = dirList[i];
			if(value.toUpperCase() == dir.toUpperCase())
			{
				return true;				
			}
		}
	}
	
	log('Invalid direction, must be NORTH, EAST, SOUTH or WEST');
	return false;
}

//Produce report on robots current position
function report() {
	if (!robotInt) 
		return;

	log('x: ' + robotPosX + ', y: ' + robotPosY + ', f: ' + robotDir);
};

//Place the robot in a valid location
function place(xPos = -1, yPos = -1, dir = '') {
	if(!posCheck(xPos, 'x')) 
		return;
	if(!posCheck(yPos, 'y')) 
		return;
	if(!dirCheck(dir)) 
		return;		

	robotPosX = xPos;
	robotPosY = yPos;
	robotDir = dir.toUpperCase();
	robotInt = true;
}

//Turns the robot 90 degrees right
function right() {
	if (!robotInt) 
		return;

	var index = dirList.indexOf(robotDir);		
	index++;		
	if(index > dirList.length - 1)
		index = 0;	
	robotDir = dirList[index];	
}

//Turns the robot 90 degrees left
function left() {
	if (!robotInt) 
		return;
	
	var index = dirList.indexOf(robotDir);	
	index--;	
	if(index < 0)
		index = dirList.length - 1;	
	robotDir = dirList[index];
}

//Move the robot 1 unit forward in the direction its facing
function move() {
	if (!robotInt) 
		return;

	var tempX = robotPosX;
	var tempY = robotPosY;	
	
	var index = dirList.indexOf(robotDir);
	switch(index) {
    case 0: //Move north
        tempY++;
        break;
    case 1: //Move east
        tempX++;
        break;
    case 2: //Move south
        tempY--;
        break;
    case 3: //Move west
        tempX--;
        break;    
	}

	if(posCheck(tempX) && posCheck(tempY))
	{
		robotPosX = tempX;
		robotPosY = tempY;
	}
}