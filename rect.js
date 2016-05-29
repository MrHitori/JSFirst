function start_dragging(event){
drag=1;
x2=event.clientX;
y2=event.clientY;

var position_x =center_window.offsetLeft; 
var position_y =center_window.offsetTop; 

document.getElementById('some_object').style.marginLeft="0px";
document.getElementById('some_object').style.marginRight="0px";
document.getElementById('some_object').style.left=position_x;

document.getElementById('some_object').style.marginTop="0px";
document.getElementById('some_object').style.marginBottom="0px";
document.getElementById('some_object').style.top=position_y;
}

function dragging(event){
if (drag==1){

x1=event.clientX;
y1=event.clientY;

shift_x=x1-x2;
shift_y=y1-y2;

document.getElementById('some_object').style.left=some_object.offsetLeft+shift_x;
document.getElementById('some_object').style.top=some_object.offsetTop+shift_y;

x2=x1; y2=y1;
}
}	

function stop_dragging(){drag=0;}


function delete_div(id){ document.getElementById(id).remove(); }

function addBorder(){
 var blocks = document.getElementsByClassName("rect");
 for(var i=0; i < blocks.length; i++) {
  blocks[i].style.border = "2px solid transparent";
  blocks[i].style.zIndex = "1";
 }
 this.style.border = "2px solid #000"; 
 this.style.zIndex = "2147483647"; 
}

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
  div.id = "rect_"+i;
  div.style.width = randWidth+"px";
  div.style.height = randHeight+"px";
  div.style.backgroundColor = "rgb("+randR+","+randG+","+randB+")";
  div.style.top = randTop+"px";
  div.style.left = randLeft+"px";
  div.innerHTML = "<div class=\"delete\" onclick=\"delete_div('rect_"+i+"')\"></div>";
  
  div.addEventListener("click",addBorder);
  div.addEventListener("start_dragging",addBorder);
  div.addEventListener("dragging",addBorder);
  div.addEventListener("stop_dragging",addBorder);
  document.body.appendChild(div);
 }
}