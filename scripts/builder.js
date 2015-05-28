var click;
var color = '#119915';
var width=6;
var guidex;
var guidey;

addEventListener('DOMContentLoaded', initCanvas);
addEventListener('DOMContentLoaded', function(){
	var canvas = document.getElementById('screen');
	var content = document.getElementById('content');

	content.setAttribute("width", screen.width-400);
	content.setAttribute("height", screen.height-200);
	canvas.setAttribute("width", screen.width-100);
	canvas.setAttribute("height", screen.height-200);
});

var inputColor = document.getElementById('inputColor');
inputColor.addEventListener('onchange', function(evt){
	var change = String(document.getElementById('color').value);
	changeColor(change);
});


var width = document.getElementById('width');
width.addEventListener('onchange', function(evt){
	var change = document.getElementById('width').value;
	changeWidth(change);
});

function initCanvas() {	
	var canvas = document.getElementById('screen');
	var ctx = canvas.getContext('2d');
	
	canvas.addEventListener('mouseout', function(){
		click=false;
	});
	canvas.addEventListener('mousemove', function(evt){
		var position = getMousePos(canvas, evt);
		//console.log('MOVINx:' + position.x + ' , y:' + position.y);
		
		if (click===true){
			draw(ctx, position.x, position.y, color, width);
		}
	});
	canvas.addEventListener('mousedown', function(evt){
		var position = getMousePos(canvas, evt);
		draw(ctx, position.x, position.y, color, width);
		click = true;
	});
	canvas.addEventListener('mouseup', function(evt){
		click = false;
		guidex = NaN;
		guidey = NaN;
	});
}

function draw(ctx, positionX, positionY, color, width) {
		//console.log('CLICKx:' + positionX + ' , y:' + positionY);
		ctx.lineWidth= width;
		ctx.beginPath();
		ctx.arc(positionX, positionY, 0.1, 0, 2 * Math.PI, false);
		ctx.moveTo(guidex, guidey);
		ctx.lineTo(positionX, positionY);
		guidex = positionX;
		guidey = positionY;
		console.log(color);
		ctx.fillStyle="#"+color;
		ctx.fill();
		ctx.strokeStyle="#"+color;
		ctx.stroke();
		ctx.closePath();
}
function changeColor(change) {
	color = change.slice(1,7);
}
function changeWidth(change){
	width = change;
	console.log(change);
}
function getMousePos(canvas, evt) { // get canvas and event to return the cordinates
    var rect = canvas.getBoundingClientRect();
    
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
