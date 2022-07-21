
<?php require 'header.php';
      

    function print_vote($rate, $rew){
        $rating = $rate*10;
        $num_rew = count($rew);
        
        $file = glob("img/rate*");
        foreach ($file as $file_wt_rate){
            $rateo = substr($file_wt_rate, 9, 2);
            if($rateo == $rating){
                echo "<div class='review-tag'><img src='$file_wt_rate' alt='rateo' class='rate_img'><a href='#nogo'> $num_rew review</a></div>";
                break;
            }
        }
    }    
   
    function print_description($file){
        
        $desc = $file['rev'];
        $id = $file['id'];
        for($i = 0; $i < 2; $i++){
            $rand = rand() % count($desc);
            if($i != 0){
                while($rand == $tmp){
                    $rand = rand() % count($desc);
                }
            }
            echo "<p class='rest-rew'><a href='index.php?id=".$id."&rec=".$rand."'>''".$desc[$rand]['titolo']."'' </a>".$desc[$rand]['data']." </p>";
            $tmp = $rand;
        }
            
    }        

    $file = glob("data/*.json");  
    echo "<ul id='menu-main-page'>";
    foreach ($file as $file_json){
        $data = file_get_contents($file_json);
        $json_output = json_decode($data, true);
 
        echo "<li>";
        echo "<div class='container'>";
     
        // IMMAGINE
        echo '<img src="'.$json_output['thumb'].'" alt="thumb" id="rest-img">';
        //nome
        echo "<div class='el-container'>";
        echo "<h2 class='rest-title'><a href=index.php?id='".$json_output['id']."'>".$json_output['nome']."</a></h2>";

        //voto e rewiew
        print_vote($json_output['voto'], $json_output['rev']);

        print_description($json_output);

        //categoria
        echo "<p class='green'><span class='black'>Cucina: </span>";
        for($i = 0; $i < count($json_output['cucina']); $i++){
            $tmp = $json_output['cucina'][$i];
            echo "$tmp ";
        }
        echo "</p>";
        echo "</div>";
        
       
        echo "</div></li>";
        
    }
    echo "</ul>";  
    
    require 'footer.php';
