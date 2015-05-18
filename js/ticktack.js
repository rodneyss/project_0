$(document).ready( function() {
      
      
      var audioWin = new Audio('assets/eyestorm.mp3');
      var audioNo = new Audio('assets/no.mp3');
      audioNo.volume = 0.8;
      audioWin.volume = 0.8;
      audioWin.loop = true;
      audioWin.currentTime = 0;
      audioWin.pause();

      var punchSfx = new Audio('assets/sfjab.mp3');
      var hadouken = new Audio('assets/hadouken.mp3');
      var chunkick = new Audio('assets/chunkick.mp3');
      var sfchoose = new Audio('assets/sfchoose.mp3');
      hadouken.volume = 0.8;
      chunkick.volume = 0.8;

      var circle = "ooo";
      var exxs = "xxx";
      var rScore = 0;
      var lScore = 0;

      var crossImg = "assets/Cross.gif";
      var circleImg = "assets/circle.gif";

      //chunli animatons
      var chunLi = document.getElementById('chunLi');
      var clStand = "url('assets/chunstance.gif')";
      var clThrow = "url('assets/chunthrow.gif')";
      var clWin = "url('assets/chunwin.gif')";
      var width = $(window).innerWidth();     //used to line up throw for chunli
      width -= 300;

      //ryu animations
      var ryu = document.getElementById('ryu');
      var ryStand = "url('assets/ryustance.gif')";
      var ryThrow = "url('assets/ryuthrow.gif')";
      var ryWin = "url('assets/ryuwin.gif')";

      var impactRight = document.getElementById('impactRight');
      var impactLeft =  document.getElementById('impactLeft');

      
      var $turnBox = $('.turn');
      var turn = $turnBox.data('turn');

      var $xTop= $('#leftSide');
      var $oTop= $('#rightSide');
      var tCounter = 0;
      var winNum;
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
            boxTaken($box);
            }
        }

        else if( tic[$box.index()] === 1 ){
            boxChosen($box);
            }else{
             boxTaken($box);
            }
        

        if(aiOn === true && turn ==='o'){
            setTimeout(aiTurn , 1000);
        }

    };

    function boxTaken($box){
       $box.addClass("trophyAn");
        setTimeout( function() { $box.removeClass("trophyAn"); }, 1000);
        audioNo.play();
    }


      function boxChosen($box) {
            tCounter +=1;                 //track game moves                      
            $box.addClass('boxPicked');   //add a border around selected box
            var position = $box.index();   //box's index linked to tic's array position
            tic[position] = turn;         //update array position with players chosen moves x or o
            screenPos = $box.offset();   //used as the target when throwing the gif's
            throwBlockAnim($box);
            nextPlayersTurn();          //checks wins
            boxTurnToggle();            //update picture of whos turn
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
                  //$('#ryu').css({backgroundImage : ryThrow, top: 430});     //switch to throwing gif
                  ryu.style.backgroundImage = ryThrow;  //no jquery for better performace
                  ryu.style.top = "430px";
                  ryu.offsetHeight;         //by envoking offsetheight fix gif bug hopefully

                  setTimeout( function() { impactLeft.className = "impacted";}, 300);
                  setTimeout( function() { impactLeft.className = "";}, 1000);
                  punchSfx.play();
                  hadouken.play();
                  setTimeout(ryuStand, 1000);                      //switch back to standing gif
                  setTimeout(leftSideX, 400);                     //side bar height drop & throwing anim
                  setTimeout( function() { $box.addClass('exxs'); } , 700); //add players mark to square
                } else {
                  
                  // $('#chunLi').css({backgroundImage : clThrow, right : 70, top: 410});
                  chunLi.style.backgroundImage = clThrow;
                  chunLi.style.right = "70px";
                  chunLi.style.top = "410px";
                  chunLi.offsetHeight;

                  setTimeout( function() { impactRight.className = "impacted";}, 200);
                  setTimeout( function() { impactRight.className = "";}, 1000);
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
          winner(winNum);

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
          if (circle === combos[i]) {         //chun Li win
              winNum = 1;
              return true;
           
          } else if (exxs === combos[i]) {    //ryu win
              winNum = 2;
              return true;
          }
        }

        if (tCounter ===9){         //game over no winners
              winNum = 3
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
                                                                          top: 420,
                                                                          left: 280}).animate(
                                                                          screenPos, 300, destroy() );

          $xTop.animate({top: '+=55'},300);   //drops the side bar with a small bounce effect
          $xTop.animate({top: '-=20'},200);
          $xTop.animate({top: '+=20'},100);
        }, 10);
       
      };


      function rightSideO(){
       
        setTimeout( function(){
        $('#rightSide li:last-child div').unwrap().appendTo('#container').css({position: "absolute",
                                                                          top: 390,
                                                                          left: width}).animate(
                                                                          screenPos, 300, destroy() );

        $oTop.animate({top: '+=55'},300);
        $oTop.animate({top: '-=20'},200);
        $oTop.animate({top: '+=20'},100);
         
        }, 10);
      };


      //todo more efficent way to destroy!
      function destroy($this) {    // gets rid of the animated gifs being thrown
        setTimeout( function() { $('#container > .exxs, #container > .circle').remove();},250);

      };


      function gameOver(){
        $('#gameOver').show();
      };



      function beginGame() {
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
        //$('#chunLi').css({backgroundImage : clStand, right : 40, top: 430, "z-index": 100});
        //no jQuery for performance
        chunLi.style.backgroundImage = clStand; 
        chunLi.style.right = "40px";
        chunLi.style.top = "430px";
        chunLi.style.zIndex = 100;
      };

      function ryuStand() {
        //$('#ryu').css({backgroundImage : ryStand, top: 420, "z-index": 100});
        //no jQuery for performance
        ryu.style.backgroundImage = ryStand;
        ryu.style.top = "420px";
        ryu.style.zIndex = 100;
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

      function resetScore(){
        rScore = 0;
        lScore = 0;
        $('.scoreL').html(lScore)
        $('.scoreR').html(rScore)
        restartGame();
      }

      $('#resetScore').on('click', resetScore);
      $('input').on('click', toggleAI);
      $(window).on('resize', function() { setWidth(); });
      $('.box').on('click', move);
      $('#gameOver').on('click', restartGame);

});


