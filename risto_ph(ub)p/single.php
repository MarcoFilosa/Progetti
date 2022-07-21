<?php 

    //check 
    $rest_id = $_GET['id']; //set page id
    
    
    //check
    $file = glob("data/*.json");
    foreach ($file as $file_json) {
        
        $data = file_get_contents($file_json);
        $json_output = json_decode($data, true);

        if($rest_id == $json_output['id']){
           $count++;
        }                
    }
    
    if($count != 0){
          /*blocco funzioni utili*/
        
        //stamoa il voto per ogni singolo commento
        function vote_for_comment($rate, $date){
            $rating = $rate*10;

            $file = glob("img/*");
            foreach ($file as $file_wt_rate){
                $rateo = substr($file_wt_rate, 9, 2);
                if($rateo == $rating){
                    echo "<span><img src='$file_wt_rate' alt='rateo'> ".$date."</span>";
                    break;
                }
            }
        }
        
        //stampa il voto di ogni singolo ristorante
        function print_rate($rate, $rew){
            $rating = $rate*10;
            $num_rew = count($rew);

            $file = glob("img/*");
            foreach ($file as $file_wt_rate){
                $rateo = substr($file_wt_rate, 9, 2);
                if($rateo == $rating){
                    echo "<div id='rate-single-page'><img src='$file_wt_rate' alt='rateo' class='rate_img'><a href='#nogo'> $num_rew review</a></div>";
                    break;
                }
            }
        }
        
        //stampa un img casuale per ogni ristorante
        function print_random_img($rest_img){
            $set_rand = rand() % count($rest_img);
            echo "<img src='".$rest_img[$set_rand]."'>";
        }

        //stampa ogni singola recensione in un blocco section contente tutte le info
        function print_comment_section($page_review){
            $set_number_rewiew = count($page_review);
            

            $i = 0;
            
            if(isset($_GET['rec'])){
                $rev_request = $_GET['rec'];
            }
            else{
                $rev_request = 0;
            }
            while($i < 5 && $rev_request < $set_number_rewiew){
                echo "<div class='containers-single'>";
                echo '<h2 class="comment-title-single">"'.$page_review[$rev_request]['titolo'].'"</h2>';
                vote_for_comment($page_review[$rev_request]['voto'], $page_review[$rev_request]['data']);
                echo "<p class='p-user-comment'><em>".$page_review[$rev_request]['user']."</em></p>";
                echo "<p class='note_comment'>".$page_review[$rev_request]['note']."</p>";

                echo "</div>";
                $rev_request++;
                $i++;

                }
        }

        //main single.php code
        require 'header.php';
        
        echo "<div class='containers-single'><a href='main.php'>Back</a>";
        
        $file_page = file_get_contents("data/r$rest_id.json");
        $page = json_decode($file_page, true);
        
        //titolo
        echo "<h1 id='rest-single-page'>".$page['nome']."</h1>";
        
        //rating
        print_rate($page['voto'], $page['rev']);
        
        //descrizione
        echo "<p id='green-single'><span id='black'>Cucina: </span>";
        for($i = 0; $i < count($page['cucina']); $i++){
            $tmp = $page['cucina'][$i];
            echo $tmp." ";
        }
        echo "</p>";
        
        //visualizza foto random
        print_random_img($page[foto]);
        echo "</div>";
      
        //stampa i commenti
        
        print_comment_section($page['rev']);
        
        }
    
    else{
           //set random page
        $file = glob("data/*.json");
        $rand = rand() % count($file);
        $file_random = file_get_contents($file[$rand]);
        $data = json_decode($file_random, true);
        header('Refresh: 2; url=index.php?id='.$data['id']);
        echo '<div id="mess-error"><h1>Error - Page not found</h1><p>Loading..</p></div>';
        
    }
    