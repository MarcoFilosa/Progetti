"use strict";
function set_bg(){
      var bg = Math.floor(Math.random()*2) + 1;
      return bg;
}

function new_bg(){
   var random_bg = set_bg();
   var puzzle_block;
   var i;
   for(i = 1; i <= 15; i += 1){
      puzzle_block = document.getElementById("puzzle_block" + i);
      puzzle_block.style.backgroundImage = "url('bg" + random_bg + ".jpg')";
   }
}


function set_puzzle(canvas){
   var number_block = 1;
   var puzzle_block;
   var posx_1 = 0;
   var posx_2 = 0;
   var posx_3 = 0;
   var posx_4 = 0;
   var posy = 0;
   var i;
   var text_puzzle;
   //per ogni tassello (initial)
   for(i = 1; i <= 15; i += 1){
      puzzle_block = document.createElement("div");

      //set attribute
      puzzle_block.className = "puzzle_block";
      puzzle_block.id = "puzzle_block" + number_block;

      //inserisco nella canvas
      canvas.appendChild(puzzle_block);

      //background
      puzzle_block.style.backgroundImage = "url('bg1.jpg')";
      if(i <= 4){
         puzzle_block.style.backgroundPosition = posx_1 + "%" + posy + "%";
         posx_1 += 33.3;
      }
      else if(i >= 5 && i <= 8){
         posy = 33.3;
         puzzle_block.style.backgroundPosition = posx_2 + "%" + posy + "%";
         posx_2 += 33.3;
      }
      else if(i >= 9 && i <= 12){
         posy = 66.6;
         puzzle_block.style.backgroundPosition = posx_3 + "%" + posy + "%";
         posx_3 += 33.3;
      }
      else if(i >= 13 && i <= 15){
         posy = 100;
         puzzle_block.style.backgroundPosition = posx_4 + "%" + posy + "%";
         posx_4 += 33.3;
      }

      //text
      text_puzzle = document.createTextNode(number_block);
      puzzle_block.appendChild(text_puzzle);
      number_block++; //incremento = nuovo tassello del puzzle
   }
   //blocco vuoto
   puzzle_block = document.createElement("div");
   puzzle_block.className = "puzzle_block";
   puzzle_block.id = "puzzle_block16";
   canvas.appendChild(puzzle_block);
}


function shuffle(){
   shift = 0;
   //new background
   new_bg();
   var matrix = set_matrix();
   var i = 0;
   var j = 0;
   var x;
   var y;
   var tmp;
   var pzz_2;
   var pzz_1;
   var time;

   var canvas = document.getElementById("game");

   for(i = 0; i < 4; i++){
         for(j = 0; j < 4; j++){
            pzz_1 = matrix[i][j];
            for(time = 0; time< 4; time++){
               x = Math.floor(Math.random()*4);
               y = Math.floor(Math.random()*4);
               pzz_2 = matrix[x][y];
               tmp = pzz_1;

               pzz_1 = pzz_2;
               pzz_2 = tmp;

               canvas.insertBefore(pzz_1, pzz_2);
               canvas.insertBefore(pzz_2, tmp);
            }
      }
   }
   matrix = set_matrix();
}

function color_block(puzzle_block){
   puzzle_block.style.color = "red";
   puzzle_block.style.cursor = "pointer";
   puzzle_block.style.borderColor = "red";
}
function refresh_color(puzzle_block){
         puzzle_block.style.color = "black";
         puzzle_block.style.borderColor = "black";
         puzzle_block.value = "0";
}
function check_canvas(){
   var count = 0;
   var tmp;
   var i;
   var puzzle_block;

   for(i = 0; i < 16; i++){
      puzzle_block = document.getElementsByClassName("puzzle_block");
      if(typeof puzzle_block == "undefined")
         break;
      tmp = puzzle_block[i].textContent*1;
      if((tmp-1) == i)
         count++;
   }

   if(count == 15){
      var canvas = document.getElementById("game");
      var win_messege = document.createElement("div");
      var text_win = document.createTextNode("Bravo! Hai vinto");
      win_messege.id = "win_message";

      win_messege.appendChild(text_win);
      canvas.appendChild(win_messege);
   }
}

function set_shift(){
      shift += 1;
      document.getElementById("status").innerHTML = "Numero mosse: " + shift;
}

function can_shift(puzzle_block){
      var empty_block = document.getElementById("puzzle_block16");
      var canvas = document.getElementById("game");

      empty_block.id = puzzle_block.id;
      empty_block.className = puzzle_block.className;
      empty_block.style.backgroundImage = puzzle_block.style.backgroundImage;
      empty_block.style.backgroundPosition = puzzle_block.style.backgroundPosition;
      empty_block.textContent = puzzle_block.textContent;


      puzzle_block.id = "puzzle_block16";
      puzzle_block.style = "";
      puzzle_block.textContent = "";

      var matrix = set_matrix();

      set_shift(); //update mosse
      check_canvas();
      return;
}

function mouse_over(e){
   var matrix = set_matrix();
   var empty_block = document.getElementById("puzzle_block16");

   if(e.toElement.className == "puzzle_block"){
      var puzzle_block = e.toElement;
   }
   else{
      return;
   }
   //find empty_block pos
   var i;
   var j;
   for(i = 0; i < 4; i++){
      for(j = 0; j < 4; j++){
         if(matrix[i][j] == empty_block){
            var x_empty = i;
            var y_empty = j;
         }
         if(matrix[i][j] == puzzle_block){
            var x_block = i;
            var y_block = j;
         }
      }
   }

   //find block near empty one x pos  -- y stopped
   if(y_block == y_empty){
      if((x_block + 1) == x_empty && x_block < 3){
            color_block(puzzle_block);
            puzzle_block.value = "1";
      }
      else if((x_block - 1) == x_empty && x_block > 0){
            color_block(puzzle_block);
            puzzle_block.value = "1";
      }
   }
   //find block near empty one y pos  -- x stopped
   if(x_block == x_empty){
      if((y_block + 1) == y_empty && y_block < 3){
         color_block(puzzle_block);
         puzzle_block.value = "1";
      }
      else if((y_block - 1) == y_empty && y_block > 0){
         color_block(puzzle_block);
         puzzle_block.value = "1";
      }
   }
}

function set_matrix(){
   var i;
   var puzzle_block;
   var j;
   var x = 0;
   var y = 0;

   var matrix = new Array(4);
   //define new matrix
   for (i = 0; i < 4; i++){
     matrix[i] = new Array(4);
   }

   //set matrix
   for(i = 0; i < 16; i++){
      puzzle_block = document.getElementsByClassName("puzzle_block");
      matrix[x][y] = puzzle_block[i];
      if(y == 3){
         y = -1;
         x++;
      }
      y++;
   }
   return matrix;
}


//main
function main(){
   var canvas = document.getElementById("game");
   set_puzzle(canvas);

   document.getElementById("controls").addEventListener("click", shuffle);

   //mouseover
   canvas.addEventListener("mouseover", function(e){
               mouse_over(event);
   }, false);

   canvas.addEventListener("click", function(e){
                  if(e.toElement.value == "1"){
                     can_shift(e.toElement);
                  }
   }, false);

   //mouseout
   var puzzle_blocks = document.getElementsByClassName("puzzle_block");
   for(var i = 0; i < puzzle_blocks.length; i++){
         puzzle_blocks[i].addEventListener("mouseout", function(){
               refresh_color(this);
         }, false);
   }
}

var shift = 0;
main();
