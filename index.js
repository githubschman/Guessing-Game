var Game = function() {
    this.playersGuess = null;
    this.winningNumber = generateWinningNumber();
    this.pastGuesses = [];

    console.log(this.winningNumber)

}

function generateWinningNumber() {
    return Math.ceil(Math.random()*100);
}


function newGame() {
    return new Game(); //check that old game !== new game
}

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess-this.winningNumber);
}

Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(guess) {
    if(typeof guess !== 'number' || guess < 1 || guess > 100) {
        throw "That is an invalid guess.";
    }
    this.playersGuess = guess;
    return this.checkGuess();
}

//color values:



var r = 50;
var g = 50;
var b = 50;


//CHANGING THE COLOR:
var hotChange = function() {
    r += 100
    b -= 50
    console.log('getting hotter')
    var thergb = "rgb(" + r + "," + g + "," + b + ")"; 
    
    document.getElementById("subtitle").style.color = thergb
    
}

var superHotChange = function() {
    r = 200
    b = 0
    g = 0
    console.log('getting hotter')
    var thergb = "rgb(" + r + "," + g + "," + b + ")"; 
    
    document.getElementById("subtitle").style.color = thergb
    
}

var coldChange = function() {
    b += 100
    r -= 50
    console.log('getting cooler')
    var thergb = "rgb(" + r + "," + g + "," + b + ")"; 
    
    document.getElementById("subtitle").style.color = thergb
    
}


var freezingChange = function() {
    b += 200
    r -= 100
    console.log('getting cooler')
    var thergb = "rgb(" + r + "," + g + "," + b + ")"; 
    
    document.getElementById("subtitle").style.color = thergb
    
}


var normalColor = "rgb(0, 196, 204)"; 

Game.prototype.checkGuess = function() {
    if(this.playersGuess===this.winningNumber) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("You won!")
        document.getElementById("subtitle").style.color = normalColor
    
        return 'You Win!'
    }
    else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
            $('#subtitle').text("You've already guessed that number")
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);

            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if(this.pastGuesses.length === 5) {
                $('#hint, #submit').prop("disabled",true);
                $('#subtitle').text("The secret number was " + this.winningNumber + ".")
                
                 document.getElementById("subtitle").style.color = normalColor

                return 'You Lose.';
            }
            else {
                var diff = this.difference();
   
                $('#subtitle').text("Keep guessing!")
                //hot change    
                if(diff < 20){superHotChange()}

                //medium change    
                else if(diff < 30){hotChange()}

                //colder change
                else if(diff < 60){coldChange()}

                //freezing change        
                else return freezingChange()
            }
        }
    }
}


//Hints:

Game.prototype.hintOne = function(){

        if(this.winningNumber % 2 === 0){
            return 'The secret number is even.'
            
        }else{
            
            return 'The secret number is odd.'
            
        }
    
}

Game.prototype.hintTwo = function(){

 for(var i = 2; i < this.winningNumber; i++) {
    
    if(this.winningNumber % i === 0) {

            return 'The secret number is not prime.'
        }
        
    }

        return 'The secret number is prime.'
    
}
    

Game.prototype.hintThree = function(){
    var digits = this.winningNumber.toString().length

    if(digits === 1){

         return 'The secret number is ' + digits + ' digit long.'
    
    }else{

         return 'The secret number is ' + digits + ' digits long.'
    
    }
   
}


    


function makeAGuess(game) {
    //guess is the value of player input
    var guess = $('#player-input').val();
    $('#player-input').val("");

    //remember that input is always a string. you need to parse for an integer
    var output = game.playersGuessSubmission(parseInt(guess,10));
   
}

$(document).ready(function() {
    var game = new Game();

    
    //if the user presses submit, run the makeAGuess function
    $('#submit').click(function(e) {
       makeAGuess(game);
    })


    //or if they press the enter button (13)
    $('#player-input').keypress(function(event) {
        if ( event.which == 13 ) {
           makeAGuess(game);
        }
    })


    var hintNum = 0;

    $('#hint').click(function() {
        
        var hintOne = game.hintOne();
        var hintTwo = game.hintTwo();
        var hintThree = game.hintThree();
        hintNum++

        if(hintNum === 1){

            $('#hintList li:nth-child('+ hintNum +')').text(hintOne);

        }else if(hintNum === 2){

            $('#hintList li:nth-child('+ hintNum +')').text(hintTwo);

        }else if(hintNum === 3){

            $('#hintList li:nth-child('+ hintNum +')').text(hintThree);

        }else{

            $('#hintList li:nth-child('+ hintNum +')').text('No more hints!');
        }
        
        
        
    });


    $('#reset').click(function() {
        game = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess').text('#');
        $('.hint').text('')
        $('#hint, #submit').prop("disabled",false);
        hintNum = 0;

         document.getElementById("subtitle").style.color = normalColor

    })
})