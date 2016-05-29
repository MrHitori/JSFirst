var mouseX, mouseY;
(function(){
 window.addEventListener("mousemove", function(e){
 alert("x = "+e.pageX+", y = "+e.pageY);
 mouseX = e.pageX; mouseY = e.pageY;
 
 },false);
}());


function startDrag(){
 var mouseX = "d";
 var mouseY = "df";

}

function addBorder(){ this.style.border = "1px solid #000"; this.style.zIndex = "2147483647"; }
function removeBorder(){ this.style.border = "1px solid transparent"; this.style.zIndex = "1"; }

function createDivs(){
 client_w = document.body.clientWidth;
 client_h = document.body.clientHeight;
 for(var i=0;i<10;i++){
  var randWidth = Math.floor(Math.random() * (client_w / 3)) + 10;
  var randHeight = Math.floor(Math.random() * (client_h / 3)) + 10;

  var randR = Math.floor(Math.random() * 255) + 1;
  var randG = Math.floor(Math.random() * 255) + 1;
  var randB = Math.floor(Math.random() * 255) + 1;

  var randTop = Math.floor(Math.random() * (client_h)); if(randTop>randHeight){ randTop-=randHeight; }
  var randLeft = Math.floor(Math.random() * (client_w)); if(randLeft>randWidth){ randLeft-=randWidth; }

  var div = document.createElement('div');
  div.className = "rect";
  div.id = "rect";
  div.style.width = randWidth+"px";
  div.style.height = randHeight+"px";
  div.style.backgroundColor = "rgb("+randR+","+randG+","+randB+")";
  div.style.top = randTop+"px";
  div.style.left = randLeft+"px";
  div.addEventListener("mouseover",addBorder);
  div.addEventListener("mouseout",removeBorder);
  div.addEventListener("click",startDrag);
  document.body.appendChild(div);
 }
}