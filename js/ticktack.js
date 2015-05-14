$(document).ready( function() {
      
      
      var audioWin = new Audio('http://remix.freakonomix.com/remixes/2080/Eye%20Of%20The%20Storm%20(DJ%20Sisco%20Remix)%20master.mp3')
      audioWin.volume = 0.2;

      audioWin.currentTime = 0;
      audioWin.pause();

      var punchSfx = new Audio('assets/sfjab.mp3');
      var hadouken = new Audio('assets/hadouken.mp3');
      var chunkick = new Audio('assets/chunkick.mp3');
      var sfchoose = new Audio('assets/sfchoose.mp3');
      hadouken.volume = 0.2;
      chunkick.volume = 0.2;

      var circle = "ooo";
      var exxs = "xxx";
      var rScore = 0;
      var lScore = 0;

      var crossImg = "assets/Cross.gif";
      var circleImg = "assets/circle.gif";

      //chunli animatons
      var clStand = "url('assets/chunstance.gif')";
      var clThrow = "url('assets/chunthrow.gif')";
      var clWin = "url('assets/chunwin.gif')";

      //ryu animations
      var ryStand = "url('assets/ryustance.gif')"
      var ryThrow = "url('assets/ryuthrow.gif')";
      var ryWin = "url('assets/ryuwin.gif')";
      var $impactRight = $('.impactRight');
      var $impactLeft = $('.impactLeft');

      
      var $turnBox = $('.turn');
      var turn = $turnBox.data('turn');

      var $xTop= $('#leftSide');
      var $oTop= $('#rightSide');
      var tCounter = 0;
      var screenPos;
      var aiOn = true;

      var tic = [1, 1, 1,
        1, 1, 1,
        1, 1, 1
      ];


      beginGame();
      preloader();
      setWidth();
    
    


      var move = function() {
        
          var $box = $(this);

        if(aiOn===true){
            if (  tic[$box.index()] === 1 && turn ==='x'){ 
                boxChosen($box);
            } 

            else {
              alert("postion used already");
            }
        }

        else if( tic[$box.index()] === 1 ){
            boxChosen($box);
            }else{
              alert("postion used already");
            }
        

        if(aiOn === true && turn ==='o'){
            setTimeout(aiTurn , 1000);
        }

    };


      function boxChosen($box) {
            tCounter +=1;                 //track game moves
                                  
            $box.addClass('boxPicked');   //add a border around selected box
           

            var position = $box.index();    //box's index linked to tic's array position
            

            tic[position] = turn;             //update array position with players chosen moves x or o

            screenPos = $box.offset();        //used as the target when throwing the gif's

            throwBlockAnim($box);

            nextPlayersTurn();  //checks wins
            boxTurnToggle(); //update picture of whos turn
      };


      var aiTurn = function() {
           var lookForMove = true;


           if(turn === "o"){
              while(lookForMove ){
                var position = Math.floor(Math.random() * 9);

                if( tic[position]=== 1  ){
                  lookForMove = false;

                  var box = $('.box')[position];
                  $box = $(box);

                  boxChosen($box);
                }

              }
          }

      };


        function throwBlockAnim($box) {
                  if (turn === "x") {      
                  $('#ryu').css({backgroundImage : ryThrow, top: 430});     //switch to throwing gif
                  setTimeout( function() {$impactLeft.toggleClass('impacted')}, 300);
                  setTimeout( function() {$impactLeft.toggleClass('impacted')}, 1000);
                  punchSfx.play();
                  hadouken.play();
                  setTimeout(ryuStand, 1000);                      //switch back to standing gif
                  setTimeout(leftSideX, 400);                     //side bar height drop & throwing anim
                  setTimeout( function() { $box.addClass('exxs'); } , 700); //add players mark to square
                } else {
                  
                  $('#chunLi').css({backgroundImage : clThrow, right : 70, top: 410});
                  setTimeout( function() {$impactRight.toggleClass('impacted')}, 200);
                  setTimeout( function() {$impactRight.toggleClass('impacted')}, 1000);
                  punchSfx.play();
                  chunkick.play();
                  setTimeout(chunStand, 600);
                  setTimeout(rightSideO, 300);
                  setTimeout( function() { $box.addClass('circle'); } , 700);
                }
        };


        function nextPlayersTurn() {
        if (  gameFinished()  ) {       
          gameOver();
        } else if (turn === "x") {
          turn = 'o';
        } else {
          turn = 'x';
        }
      };


        function gameFinished() {
     
         //horizontal wins
        var one = tic[0] + tic[1] + tic[2];
        var two = tic[3] + tic[4] + tic[5];
        var three = tic[6] + tic[7] + tic[8];

        //vertical wins
        var four = tic[0] + tic[3] + tic[6];
        var five = tic[1] + tic[4] + tic[7];
        var six = tic[2] + tic[5] + tic[8];

        //diagnal wins
        var seven = tic[6] + tic[4] + tic[2];
        var eight = tic[0] + tic[4] + tic[8];


        var combos = [one, two, three, four, five, six, seven, eight];


        //checks for winner or game over. 
        //gets the value of tic array which contains all the players moves. Places moves into winning combos
        //if those strings equal "xxx" or 'ooo' we have a winner.

        for (var i = 0; i < combos.length; i++) { 
          console.log(combos);
          if (circle === combos[i]) {         //chun Li win
              winner(1);
              return true;
           
          } else if (exxs === combos[i]) {    //ryu win
              winner(2);
              return true;
          }
        }

        if (tCounter ===9){         //game over no winners
              winner(3);
              return true;
        }

      };



      //places trophy to winners side and updates gif to win stance
      function winner(whoWon){

          if(whoWon === 1){
              audioWin.play();
              rScore +=1;
              $('.scoreR').html(rScore)
              $('#trophy').addClass('tRight');
              setTimeout( function() {$('#chunLi').css({backgroundImage : clWin, 
                                                             "z-index"  : 1002,
                                                                    top : 380})}, 1000);
          }else if (whoWon === 2){
              audioWin.play();
              lScore +=1;
              $('.scoreL').html(lScore)
              $('#trophy').addClass('tLeft');
              setTimeout( function() {$('#ryu').css({backgroundImage : ryWin,
                                                           "z-index" : 1002,
                                                                 top : 400})}, 1000);
          }else if (whoWon ===3){
              $('#trophy').hide();
          }
      };


 

      function leftSideX(){
  
        setTimeout( function(){

          //removes the div with pic, destroys the li its wrapped in. appends to container
          //then gets animated to be thrown at table, then runs destroy()

          $('#leftSide li:last-child div').unwrap().appendTo('#container').css({position: "absolute",
                                                                          top: 350,
                                                                          left: 400}).animate(
                                                                          screenPos, 200, destroy() );

          $xTop.animate({top: '+=55'},300);   //drops the side bar with a small bounce effect
          $xTop.animate({top: '-=20'},200);
          $xTop.animate({top: '+=20'},100);
        }, 10);
       
      };


      function rightSideO(){

        setTimeout( function(){
        $('#rightSide li:last-child div').unwrap().appendTo('#container').css({position: "absolute",
                                                                          top: 350,
                                                                          left: 800}).animate(
                                                                          screenPos, 200, destroy() );

        $oTop.animate({top: '+=55'},300);
        $oTop.animate({top: '-=20'},200);
        $oTop.animate({top: '+=20'},100);
         
        }, 10);
      };



      function destroy() {    // gets rid of the animated gifs being thrown
        setTimeout( function() { $('#container > .exxs, #container > .circle').remove()},180);
      };


      function gameOver(){
        $('#gameOver').show();
      };



      function beginGame() {
        console.log('starting game')
        sideSetup();
        $('#gameOver').hide();
      };


      function sideSetup() {
        var side = '<li><div class="pieces"></div></li>';
        for (var i = 0; i < 5; i++) {
          $('.rightSide').append(side);
          $('.leftSide').append(side);
         
        }
          $('.rightSide .pieces').addClass('circle');
          $('.leftSide .pieces').addClass('exxs');
      };

  

      function restartGame(){
        

        $('.box').each(function(){
            $(this).removeClass('exxs circle boxPicked');
        });

        audioWin.currentTime = 0;
        audioWin.pause();

        $('.rightSide li').remove();
        $('.leftSide li').remove();

        tic = [1, 1, 1,
        1, 1, 1,
        1, 1, 1
        ];
       
        tCounter = 0;
        turn = 'x';
        beginGame();
        chunStand();
        ryuStand();
        $('#trophy').show().removeClass('tLeft').removeClass('tRight');
        $oTop.css('top', '160px');
        $xTop.css('top', '190px');
        $('.turn').addClass('exxs');
        $('.turn').removeClass('circle');

        sfchoose.play()
      };

      function boxTurnToggle() {
        $turnBox.toggleClass('exxs');
        $turnBox.toggleClass('circle');
      };


      function chunStand() {
        $('#chunLi').css({backgroundImage : clStand, right : 40, top: 430, "z-index": 100});
      };

      function ryuStand() {
        $('#ryu').css({backgroundImage : ryStand, top: 420, "z-index": 100});
      };

      function preloader() {      
      
      var img1 = new Image();
      var img2 = new Image();
      var img3 = new Image();
      var img4 = new Image();

      img1.src = "assets/ryuthrow.gif";
      img2.src = "assets/chunthrow.gif";
      img3.src = "assets/chunwin.gif";
      img4.src = "assets/ryuwin.gif";
      };
      
      function setWidth(){
      var size = $(window).innerWidth();
      $('#gameOver').css({width: size});
      };

      function toggleAI(){
        if( $(this).val() === "on" ){
          if(aiOn===false){
            aiOn = true;
            aiTurn();
          }
        }else{
          aiOn = false;
        }
      }

      $('input').on('click', toggleAI);
      $(window).on('resize', function() { setWidth(); });
      $('.box').on('click', move);
      $('#gameOver').on('click', restartGame);

});


