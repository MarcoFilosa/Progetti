set_puzzle_block();
var random_bg = parseInt(Math.random() + 2);


function set_puzzle_block(random_bg) {
   var game = document.getElementById('game'), number_el = 1;
   for (var i = 0; i < 15; i++) {
      var puzzle_el = document.createElement('div');
      puzzle_el.className = "puzzle-block";
      puzzle_el.id = "puzzle-block" + number_el;
      game.appendChild(puzzle_el);


      //set background-image by id
      puzzle_el.backgroundImage = "url(bg" + random_bg + ".jpg)";


      //set puzzle-block
      var number_block = document.createTextNode(number_el);
      puzzle_el.appendChild(number_block);
      number_el++;
   }
}

shuffle(){
   //new background
   new_bg();
   var matrix = set_matrix();

   //shuffling algorithm
   var canvas = document.getElementById('game');
   var pzz_1, pzz_2, i, j, tmp_pzz;
   for(i = 1; i <= 16; i++){
      pzz_1 = document.getElementById('puzzle_block' + i);
      for(j = 0; j < 300; j++){
            var random = Math.floor(Math.random()*15) + 1;
            pzz_2 = document.getElementById('puzzle_block' + random);

            tmp_pzz = pzz_1;
            canvas.insertBefore(pzz_1, pzz_2);
            canvas.insertBefore(pzz_2, tmp_pzz);
      }
   }
   console.log(matrix);
   }



   for(var i = 1; i <= 4; i++){
         for(var j = 1; j <= 4; j++){
            puzzle_block = matrix[i-1][j-1];
            if(typeof puzzle_block == "undefined")
               break;

            block_text = puzzle_block.textContent*1;
            if(block_text == selector){
               count++;
            }
            selector++;
         }

   }
