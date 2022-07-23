/*tools for all section*/

//see stats
function button_stats(){
	document.getElementById('button-container').addEventListener("click", function(e) {
		//search target
		var button_clicked = e.target;
		var status_bar = document.getElementById('progress-bar-js');
		var random = 0;
		console.log(status_bar); //debug

		if(button_clicked.classList.item(3) == 'button_1'){
			random = Math.random()*20 + 80;
			status_bar.style.width = random + '%';
			status_bar.style.backgroundColor = '#77dd77';
			status_bar.innerHTML = parseInt(random) + '%';
		}

		else if(button_clicked.classList.item(3) == 'button_2'){
			random = Math.random()*20 + 40;
			status_bar.style.width = random + '%';
			status_bar.style.backgroundColor = '#f7c800';
			status_bar.innerHTML = parseInt(random) + '%';
		}

		else if(button_clicked.classList.item(3) == 'button_3'){
			random = Math.random()*20 + 1;
			status_bar.style.width = random + '%';
			status_bar.style.backgroundColor = '#d32d24';
			status_bar.innerHTML = parseInt(random) + '%';
		}
	}, false);
}


/*search bar*/
var div_words_searched = document.createElement('div');
div_words_searched.className = 'searchBar-extension';
var list_words = document.createElement('ul');
var check = false;
var database_words = 
{
	"c" : ['comment', 'community'],
	"a" : ['alert', 'all props', 'arrived'],
	"h" : ['help', 'hover'],
	"u" : ['user', 'userField'],
	"f" : ['feedback', 'feed you']
};

var search_bar = document.getElementById('input_search_bar');
var container_searchBar = document.getElementById('container-search'); //container dove va inverito l'estensione della search-bar
search_bar.addEventListener('keydown', function() {

	if(check){
		console.log("check");
		div_words_searched.removeChild(list_words);
		check = false;
	}

	var text_input = search_bar.value.toLowerCase(); //take the string in the lower case

	console.log(text_input.substring(0,1));
	for(var key in database_words){
		if(text_input.substring(0,1) == key) {
			container_searchBar.appendChild(div_words_searched);
			div_words_searched.appendChild(list_words);
			for(var i = 0; i < database_words[key].length; i ++){
				var tmp_array = database_words[key];
				var list_element = document.createElement('li');
				list_words.appendChild(list_element);
				list_element.className = 'li-search-bar';
				list_element.innerHTML = tmp_array[i];
				check = true;
			}
		}
	}

}, false);

