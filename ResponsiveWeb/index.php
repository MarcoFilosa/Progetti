<?php 
          include_once 'elaborate_index.php';

          session_start();
          check_session_status();
          
           $host = 'localhost';
          $db_user = 'mydb';
          $db_pass = 'user';
          $db_name = 'sito_responsive';
          $user_id_session = session_id();
          
          
          /*Sezione di ricerca db con tabella*/
          try{
                         $conn = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_pass);
                         $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                     }
?>

<!DOCTYPE html>
<html lang='it'>
         <?php require 'head.php';?>
    <title>Home Page</title>
     </head>
   <body>
      <?php include 'navbar.php';?> <!--navbar header -->
       <header id='header-page'>
          <div class='row' id='div-header'>
            <div class='col-sm-11 main-header'>
                <h2 id='title-header-body'>Inizia subito</h2>
                <ul id='header-nav-ul'>
                  <li class='header-list'><a href='#home'>HOME</a></li>
                  <li class='header-list'><a href='#servizi'>SERVIZI</a></li>
                  <li class='header-list'><a href='#feedback'>FEEDBACK</a></li>
                  <li class='header-list'><a href='#comments'>INFO</a></li>
                </ul>
                <img src='image/database-icon.png' class="img-index" alt='db'>
              </div>
            </div> 
       </header><!-- / end header -->

       <!-- main info -->
       <main>
        <div class='row'>
           <div class='col-lg-4' id='home-body'>
               <h3 class='heading-main' id='home'>EASY INTERACT</h3>     
                <div class='container-main'>
                  <h4 class='heading-main sub-title'>Tabelle e Servizi<img src='image/tool.png' class='relative_info_image' alt='tool'></h4>
                  <p class='main-p-text'>Testalo ora:</p>
                    <form id='table-form' class="form-inline" action='<?php  echo $_SERVER['PHP_SELF'] . "?table=true#home"?>' method='post'>
                        <label for="code_id" class='main-p-text'>Nome prodotto<em style='font-size: 15px;'>(scelto tra le tendenze)</em></label><br>
                        <input type="text" class="form-control input-main" name='prod_name' id="code_id"  placeholder="Aerocol">
                        <input type="submit" class="form-control" value='Search' style='width: 100%;' name='search_item'>
                    </form> <!-- //end form with the access on db -->
                    <?php
                              //:: TODO :: require script.php
                              set_db_info($conn,  $user_id_session);
                    ?>
                </div>
           </div> <!-- /end home -->

           
           <div class='col-lg-4' id='service-body'>
               <h3  class='heading-main' id='servizi'>TOOLS FOR ALL-S</h3> 
               <ul>
                <li class='main-list-option'>
                  <div class='container-main main-blue'>
                    <h4 class='heading-main sub-title'>Search Bar <img src='image/search.png' class='relative_info_image' alt='search'></h4>
                    <div id='container-search'>
                      <input class='input-main' type='text' id='input_search_bar'>
                    </div>
                  </div>
               </li>
               <li class='main-list-option'>
                  <div class='container-main main-blue'>
                    <h4 class='heading-main sub-title'>See Stats<img src='image/stats.png' class='relative_info_image' alt='stats'></h4>
                      <div id='button-container'>
                        <button type="button" class="btn btn-primary btn-lg button_1">Score</button>
                        <button type="button" class="btn btn-primary btn-lg button_2">Middle</button>
                        <button type="button" class="btn btn-primary btn-lg button_3">Fail</button>
                        <div class="progress">
                            <div class="progress-bar" id='progress-bar-js' role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 1%;">
                              1%
                            </div>
                        </div>
                      </div>
                  </div>
                </li>
                </ul> 
         </div> <!-- /end  service-->

           <div class='col-lg-4' id='feedback-body'>
               <h3 class='heading-main' id='feedback'>YOUR FEEDBACK</h3> 
                  <div class='container-main main-orange'>
                    <h4 class='heading-main sub-title'>Set your own<img src='image/user.png' class='relative_info_image' alt='user'></h4>
                    <div id='feedback-info-container'>Create now!
                      <ul id='list-info-user'>
                        <li class='feed-list'><img class='list-icon' src='image/user-icons.png' alt='icons'>No more difficults, just click <a href='#subscrive'>HERE.</a></li>
                        <li class='feed-list'><img class='list-icon' src='image/user-icons.png' alt='icons'>Create your own profile.</li>
                        <li class='feed-list'><img class='list-icon' src='image/seo.png' alt='icons'>Subscrive the program! So many features in that.</li>
                        <li class='feed-list'><img class='list-icon' src='image/seo.png' alt='icons'>Gesture and system to improve your system control.</li>
                        <li class='feed-list'><img class='list-icon' src='image/comments.png' alt='icons'>Your feedback is important for us. Leave a <a href='#commen'>comment.</a></li>
                      </ul>
                    </div>
                  </div>
           </div><!-- /end feedback -->

        </div> <!-- end first row -->

        <div class='row'>
          <section class='feed-section'>
                      <div class='col-md-5' id='subscrive-body'>
                        <h3 class='bottom-main-title' id='subscrive'>SUBSCRIVE NOW!</h3> 
                          <p id='info-sub'>Insert your own creditials, with email, and a new password. You must be 18 or more years old.</p>
                           <form action='<?php echo $_SERVER['PHP_SELF'] . "?request_sub=true#subscrive"?>' method='post'> <!-- form d'iscrizione -->
                              <div class="form-group form-bottom-main-sub">
                                  <label  for="user_email">Email address</label>
                                  <input type="email" class="form-control" id="user_email" name='u_email' placeholder="Email" required><br>
                                  <label for="user_age">Age</label>
                                  <input type="number" class="form-control" id="user_age" name='u_age' placeholder="18 >"><br>
                                  <input type="submit" class="btn btn-default" value='Submit Request' name='sub-submit'>
                              </div>
                            </form>
                          <?php 
                                        if(isset($_SESSION['bad-request'])){
                                             echo  "<p class='alert-18'>" . $_SESSION['bad-request'] . "</p>";
                                        }
                                        else if(isset($_GET['check_email'])){
                                              echo  "<p class='alert-18'>email already used</p>";
                                        }
                          ?>
                      </div>
                      <div class='col-md-7' id='comments-body'>
                        <h3 class='bottom-main-title' id='comments'>IT'S YOUR TURN!</h3> 
                          <div class='bottom-main-container'>
                            <p id='info_comments'>Many people have expressed their feedback to us. Now it's your turn...<em>see all right bottom.</em></p>
                             <form method='post' action='<?php echo $_SERVER['PHP_SELF'] . "?insert_comment=true#comments"?>'>  <!-- form inserimento commento -->
                                <div class="form-group form-comment">
                                  <h4>Leave it Here!</h4> 
                                  <textarea <?php if(isset($_SESSION['inserted_comment'])): echo "readonly placeholder='Thank you!'";endif;?>
                                      class='leave_comment' name="new_comment"  rows="2" required></textarea>
                                  <input <?php if(isset($_SESSION['inserted_comment'])): echo "type='hidden'";endif;?> type='submit' class="btn btn-default" value='INSERT :)' name='submit_comment'>
                                </div>
                              </form>
                          </div>
                          <div class='bottom-main-container'>
                            <h4>Others have left:</h4>
                            <?php
                                        print_db_comments($conn);
                            ?>
                          </div>
                        <div id="icon-container"><span class='glyphicon glyphicon-menu-up' onclick='OnTop()'></span></div>
                      </div>
           </section> <!-- /end section subscrive and comments -->
          </div>
       </main> <!--/end main -->

       <?php include 'footer.php'?>
   <!--/ html -->
   <script src='script.js'></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" ></script>
   </body>
</html>


<?php
     //catch 
     }
     catch(PDOException $exc){
          echo $exc->getMessage();
     }
