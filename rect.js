/* Start Drag&Drop */
 DragDrop = function(id){
  var t = this;
  if(typeof(id)=='string'){
   var elem = document.querySelector(id);
   t.element = document.querySelector(id);
  }else{
   var elem = id;
   t.element = id;
  }
  for(var n in DragDrop.objects){
   if(DragDrop.objects[n].element==elem){
    return DragDrop.objects[n];
   }
  } DragDrop.objects.push(t);
 
  t.drag = function(event){ /* Drag DIV */
   if(event.preventDefault){
    event.preventDefault();
   }
   t.x = event.clientX;
   t.y = event.clientY;
   t.onup = document.onmouseup;
   t.onmove = document.onmousemove;
   document.onmouseup = t.drop;
   document.onmousemove = t.move;
  }
 
  t.drop = function(event){ /* Drop DIV */
   document.onmouseup=t.onup;
   document.onmousemove=t.onmove;
   if(event.target){
    t.target = event.target;
   }else{
    t.target = event.srcElement;  
   }
   if(t.ready!=undefined){
    return t.ready();
   }
  }
 
  t.move = function(event){ /* Move DIV */
   if(elem.currentStyle){
    t.left = elem.currentStyle["marginLeft"];
    t.top = elem.currentStyle["marginTop"];
   }else{
    t.left = window.getComputedStyle(elem,"").getPropertyValue("margin-left");
    t.top = window.getComputedStyle(elem,"").getPropertyValue("margin-top");
   }
   if(!parseInt(t.left)){
    t.left=0;
   }
   if(!parseInt(t.top)){
    t.top=0;
   }
   elem.style.marginLeft = parseInt(t.left) + event.clientX - t.x+"px";
   elem.style.marginTop = parseInt(t.top) + event.clientY - t.y+"px";
   t.x = event.clientX;
   t.y = event.clientY;
   if(t.action!=undefined){
    return t.action();
   }
  }
 }

 DragDrop.objects = [];
 function useDrag(event){
  id = event.target;
  var d = new DragDrop(id);
  d.drag(event);
 }
/* End Drag&Drop */

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
 var client_w = document.body.clientWidth;
 var client_h = document.body.clientHeight;
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
  div.addEventListener('mousedown', function() { useDrag(event); }, false);
  document.body.appendChild(div);
 }
}