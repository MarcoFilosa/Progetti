'use strict';
(function(){
   if(document.readyState == 'loading'){
      document.addEventListener('DOMContentLoaded', main);
   }
   else{
      main();
   }
})();


function reset_game(){
   //on contaiener
   var main_container = document.getElementById('container');
   var game_field = document.getElementById('game_field');
   var messege = document.getElementsByClassName('messege');
   main_container.removeChild(game_field);

   //on body
   var body = document.getElementsByTagName('body');
   var reset_mess = document.getElementById('end_reset_message');
   body[0].removeChild(reset_mess);

   //reset del timer counter
   main();
}

//timer control
function set_field() {
   var main_container = document.getElementById('container');
   var game_field = document.createElement('div');
   game_field.id = "game_field";

   main_container.appendChild(game_field);
}


function new_game() {
   var i, j, cell;
   var offset_x = 0;
   var offset_y = 0;
   var game_field = document.getElementById('game_field');
   var random;
   var shuff = 0;

   //draw cell box
   for(i = 0; i < 20; i++){
      for(j = 0; j < 20; j++){
         shuff = Math.floor(Math.random()*2);
         //create new div cell and set the attributes
         cell = document.createElement('div');
         cell.classList.add('block_1');
         cell.classList.add('cell');
         if(shuff == 1){
            random = Math.floor(Math.random()*2);
            cell.value = random;
         }
         else{
            cell.value = 0;
         }
         //style positioning for the new cell
         game_field.appendChild(cell);
         cell.style.left += offset_x + 'px';
         cell.style.top += offset_y + 'px';
         offset_x += 25; //shift x-pos
      }
      offset_y += 25; //shift y-pox
      offset_x = 0;  //reset the x-pos
   }

   //Start timer
}

function set_matrix() {
   var matrix = new Array(20), i, j, random = 0, x = 0;
   var cells = document.getElementsByClassName('cell');

   for(i = 0; i < 20; i++){
      matrix[i] = new Array(20);
      for(j = 0; j < 20; j++){
            matrix[i][j] = cells[x];
            x++;
      }
   }
   //ritorno la matrice di gioco
   return matrix;
}

function check_near_bomb(matrix, index_i, index_j, offset){
   //cerco il numbero di bombe vicino all'emento cliccato
   var counter_bomb = 0;
   var tmp;

   //caso numero di bombe intorno ad una cella
   if(index_i+1 < 20){
      tmp = matrix[index_i+1][index_j];
      if(tmp.value == 1)
         counter_bomb++;
   }
   if(index_i-1 > 0){
      tmp = matrix[index_i-1][index_j];
      if(tmp.value == 1)
         counter_bomb++;
   }
   if(index_j+1 < 20){
      tmp = matrix[index_i][index_j+1];
      if(tmp.value == 1)
         counter_bomb++;
   }
   if(index_j-1 > 0){
      tmp = matrix[index_i][index_j-1];
      if(tmp.value == 1)
         counter_bomb++;
   }
   return counter_bomb;
}

function end_game(element_clicked, matrix, offset){
   element_clicked.classList.add('bomb');

   //vado a visualizzare a schermo le varie bombe
   var i, j, if_bomb_cell;
   for(i = 0; i < offset; i++){
      for(j = 0; j < offset; j++){
         if_bomb_cell = matrix[i][j];
         if(if_bomb_cell.value == 1){
            if_bomb_cell.classList.add('bomb');
         }
      }
   }

   var message = document.createElement('img');
   var container = document.getElementById('container');
   message.src = "img/lose.png";
   message.alt = 'lose'
   message.className = 'messege';
   container.appendChild(message);

   var audio = document.createElement("audio");
   if (audio != null){
      audio.src = "suoni/boom.mp3";
      audio.play();
    }

      //se l'utente non vuole aspettare clicca su reset
      var body_html = document.getElementsByTagName('body');
      var div_end_game = document.createElement('div');
      div_end_game.id = 'end_reset_message';
      div_end_game.innerHTML = 'Il gioco si riavvierà a breve...';
      body_html[0].appendChild(div_end_game);

    //si riavvia il gioco dopp 5 secondi
    setTimeout(function(){
      reset_game();
   }, 2000);
}
function progressive_bar(matrix){
   //check number of no bomb
   var i, j, tmp;
   var counter_cells = 0, counter_cells_checked = 0, remaning_cells;
   var progressive_bar = document.getElementsByClassName('progress-bar progress-bar-striped bg-info active');

   for(i = 0; i < 20; i++){
      for(j = 0; j < 20; j++){
         tmp = matrix[i][j];
         if(tmp.classList.item(2) == 'checked'){
            counter_cells_checked++;
         }
         if(tmp.value == 1){
            counter_cells++;
         }
      }
   }

   progressive_bar[0].style.width = ((counter_cells_checked / 400) * 100)  + '%';
   console.log(progressive_bar[0].style.width);
}

function check_win(game_matrix){
   var i, j, tmp_cell;
   var counter_cell = 0, counter_win = 0;

   for(i = 0; i < 20; i++){
      for(j = 0; j < 20; j++){
         tmp_cell = game_matrix[i][j];
         if(tmp_cell.value == 0){
            //la casella non è una bomba
            counter_cell++;
            if(tmp_cell.classList.item(2) == 'checked'){
               //la casella è stata scoperta
               counter_win++;
            }
         }
      }
   }

   //Check se l'utente ha vinto
   if(counter_cell === counter_win){
      //l'utente ha vinto il numero di caselle scoperte == numero di caselle non bombe
      var main_container = document.getElementById('container');
      var win_message = document.createElement('img');
      win_message.className = 'messege';
      win_message.src = 'img/win.png';
      win_message.alt = 'win';
      win_message.classList.add('opacity');

      main_container.appendChild(win_message);
      var audio = document.createElement('audio');
      if(audio != null){
         audio.src = 'suoni/win.mp3';
         audio.play();
      }
   }
}

//check if the cell is a bomb or not
function check_box(element_clicked, audio_cell){
   var cells = document.getElementsByClassName('cell');
   var i, j, check_bomb = false;
   var matrix = set_matrix(); //set the matrix for the game
   console.log(matrix);

   var numb_near_bomb = 0;

   //find element in the matrix
   for(i = 0; i < 20; i++){
      for(j = 0; j < 20; j++){
         if(matrix[i][j] == element_clicked){
            if(element_clicked.value == 1){
               end_game(element_clicked, matrix, 20);
            }
            else{
               numb_near_bomb = check_near_bomb(matrix, i, j, 20);
               check_bomb = true;
               break;
            }
         }
      }
   }

   //scrivi il numero di bombe vicine
   if(check_bomb === true && element_clicked.classList.item(2) != 'checked'){
      var text_bomb = document.createTextNode(numb_near_bomb);
      element_clicked.appendChild(text_bomb);
      element_clicked.classList.add('checked');

      //audio effect
      var audio_cell = document.createElement('audio');
      audio_cell.src = "suoni/cell.mp3";
      if(audio_cell != null){
         audio_cell.play();
      }
      //check if the user wins
      progressive_bar(matrix);
      check_win(matrix);
   }


}

//main
function main() {
   //campo da gioco
   var timestamp = 0;
   set_field();

   //seleziono difficoltà
   document.getElementById('new_game').addEventListener("click", new_game);
   //set click div for the game
   document.getElementById('game_field').addEventListener("click", function(e){
         check_box(e.target);
   });

   function set_timer() {
      setInterval(function() {
         document.getElementById('time').innerHTML = 'Timer: ' + timestamp;
         timestamp++;
      }, 1000);
   }
   set_timer();
}

//gioco
