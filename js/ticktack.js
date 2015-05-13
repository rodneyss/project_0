      var oneC = "012";
      var twoC = "345";
      var threeC = "678";
      var fourC = "036";
      var fiveC = "147";
      var sixC = "258";
      var sevenC = "642";
      var eightC = "048";


      var winPosition = [oneC, twoC, threeC, fourC, fiveC, sixC, sevenC, eightC];
      var $messageTurn = $('.whosTurn');
      

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

      
      var $turnBox = $('.turn');
      var turn = $turnBox.data('turn');

      var $xTop= $('#leftSide');
      var $oTop= $('#rightSide');
      var tCounter = 0;
      var screenPos;

      beginGame();
   
      var tic = [1, 1, 1,
        1, 1, 1,
        1, 1, 1
      ];







      var move = function() {
        
          var $box = $(this);
          if (  $box.data('used') === 0) { 
            tCounter +=1;     //track game moves
                                  
            $box.addClass('boxPicked');   //add a border around selected box
            $box.data('used', turn);      //updates box's data to players mark

            var position = $box.index();
            

            tic[position] = turn;               //update array with players chosen moves x or o

            
//------------------------------------------animation-------------------------------------------------

            screenPos = $(this).offset();        //used as the target when throwing the gif's

                if (turn === "x") {      
                  $('#ryu').css({backgroundImage : ryThrow});     //switch to throwing gif
                  setTimeout(ryuStand, 1000);                      //switch back to standing gif
                  setTimeout(leftSideX, 400);                     //side bar height drop
                  setTimeout( function() { $box.addClass('exxs'); } , 700); //add players mark to square
                } else {
                  
                  $('#chunLi').css({backgroundImage : clThrow, right : 70, top: 400});
                  setTimeout(chunStand, 600);
                  setTimeout(rightSideO, 300);
                  setTimeout( function() { $box.addClass('circle'); } , 700);
                }
            
    //------------------------------- animation-------------------------------------------------    

            nextPlayersTurn();  //checks wins
            boxTurnToggle(); //update picture of whos turn

        } else {
          alert("postion used already");
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


        //checks if winner or game over. 
     
        //gets the value of tic array which is all of the players move. Places moves into winning combos
        //if those strings equal "xxx" or 'ooo' we have a winner.

        for (var i = 0; i < combos.length; i++) { 
          console.log( "itteration number " + i+ " : " +combos);
          console.log( circle +" is equal - " + combos[i]);
          console.log( exxs +" is equal - " + combos[i]);

          if (circle === combos[i]) {         //chun Li win
              winner(1);
              return true;
              //visResult(winPosition[i]);  
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



      //places trophy to winners side and updates gif to win
      function winner(whoWon){

          if(whoWon === 1){
              rScore +=1;
              $('.scoreR').html(rScore)
              $('#trophy').addClass('tRight');
              setTimeout( function() {$('#chunLi').css({backgroundImage : clWin, 
                                                             "z-index"  : 1002,
                                                                    top : 370})}, 1000);
          }else if (whoWon === 2){
              lScore +=1;
              $('.scoreL').html(lScore)
              $('#trophy').addClass('tLeft');
              setTimeout( function() {$('#ryu').css({backgroundImage : ryWin,
                                                           "z-index" : 1002,
                                                                 top : 390})}, 1000);
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


      function visResult(combo) {
        //console.log(combo + $('.box')[ parseInt(combo[0][0])  ]);
        // $('.box')[ parseInt(combo[0])].addClass("winner");
        // $('.box')[ parseInt(combo[1])].addClass("winner");
        // $('.box')[ parseInt(combo[2])].addClass("winner");

        // $('.box').not('.winner').addClass("looser");
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
            $(this).data('used', 0);
            
        });

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


      $('.box').on('click', move);
      $('#gameOver').on('click', restartGame);