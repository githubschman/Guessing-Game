
function Game(){

	secretNum = this.generateWinningNumber()
	this.secretNum = secretNum
	
	this.playerGuesses = []
	
	
	//hints:
	this.giveHintOne = true
	this.giveHintTwo = true
	this.giveHintThree = true

	this.noMoreHint = false
	
	
	console.log(secretNum)
	return secretNum
	
}





Game.prototype.generateWinningNumber = function(){
	
	var newNum = Math.ceil(Math.random() * 100)
	if(newNum === 0){
		newNum += 1
		
	}
	
	return newNum
	
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







Game.prototype.checkGuess = function() {
    if(this.playersGuess===this.winningNumber) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Win!'
    }
    else {
        if(this.playerGuesses.indexOf(this.playersGuess) > -1) {
            return 'You have already guessed that number.';
        }
        else {
            this.playerGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.playerGuesses.length +')').text(this.playersGuess);
            if(this.playerGuesses.length === 5) {
                $('#hint, #submit').prop("disabled",true);
                $('#subtitle').text("Press the Reset button to play again!")
                return 'You Lose.';
            }
            else {
                var diff = this.difference();
                if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }
                if(diff < 10) return'You\'re burning up!';
                else if(diff < 25) return'You\'re lukewarm.';
                else if(diff < 50) return'You\'re a bit chilly.';
                else return'You\'re ice cold!';
            }
        }
    }
}


Game.prototype.reset = function(){
	this.secretNum = this.generateWinningNumber()
	this.playerGuesses = []
	this.giveHintOne = true
	this.giveHintTwo = true
	this.giveHintThree = true
	this.noMoreHints = false
	return 'new game'
}


Game.prototype.provideHint = function(){

	
	secretNum = this.secretNum
	
	if(this.giveHintOne === true){
		if(secretNum % 2 === 0){
			
			this.giveHintOne = false
			return 'The secret number is even.'
			
		}else{
			
			this.giveHintOne = false
			return 'The secret number is odd.'
			
		}
	
	}
	
	
	if(this.giveHintTwo === true){
		
	    for(var i = 2; i < secretNum; i++) {
        if(secretNum % i === 0) {
        		this.giveHintTwo = false
            return 'The secret number is not prime.'
        }
        
    	}
		
		this.giveHintTwo = false
		return 'The secret number is prime.'
		
	}
	
	if(this.giveHintThree === true){
		
		this.noMoreHints = true
		this.giveHintThree = false
		if(secretNum.toString().length >= 2){
			return 'The secret number is ' + secretNum.toString().length + ' digits.'
		}else{
			return 'The secret number is 1 digit.'
		}
	}
	
	if(this.noMoreHints === true){
		
		return 'You ran out of hints!'
	}
	
}


///////////////////////////////////
/////////////JQUERY:///////////////
///////////////////////////////////


function makeAGuess(game) {
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    console.log('player\'s guess: ' + output);
    console.log('test')
}


$(document).ready(function() {
	//after the dom has loaded, make a new game.
     var game = new Game();

     //when the user presses 'submit', extract the inputted value
     //e is the event object.
    $('#submit').click(function(e) {
       makeAGuess(game);
    })

   //they can also hit the enter key (13) to make a guess:
     $('#player-input').keypress(function(event) {
        if ( event.which == 13 ) {
           makeAGuess(game);
     	 }



  	})

     //submitted value is passed into playesGuessSubmission.
     //Important to remember that user input will always be a string.
     //you need to parse for an integer 


      $('#reset').click(function() {
        game = new Game();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess').text('-');
        $('#hint, #submit').prop("disabled",false);

    })

})


