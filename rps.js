let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

/*if(!score){ //does the same as score === null
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}*/

updateScoreElement();

let isAutoPlaying = false;
let intervalID;

function autoPlay(){

  if(!isAutoPlaying){
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playgame(playerMove);
    },1000);
    isAutoPlaying = true;
    
  }else{
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-btn')
  .addEventListener('click', ()=>{
    playgame('rock')
});

document.querySelector('.js-paper-btn')
  .addEventListener('click', ()=>{
    playgame('paper')
});

document.querySelector('.js-scissors-btn')
  .addEventListener('click', ()=>{
    playgame('scissors')
});

document.body.addEventListener('keydown', (event)=> {
  if(event.key === 'r'){
    playgame('rock');
  }else if(event.key === 'p'){
    playgame('paper');
  } else if(event.key === 's'){
    playgame('scissors');
  }
});


function playgame(playerMove){
  const computerMove = pickComputerMove();

  let result = '';

  if(playerMove === 'scissors'){
    if (computerMove === 'rock'){
      result = 'You Lose';
    }else if (computerMove === 'paper'){
      result = 'You Win';
    }else if (computerMove === 'scissors'){
      result = 'Tie';
    }

  }else if (playerMove === 'paper'){
    if (computerMove === 'rock'){
      result = 'You Win';
    }else if (computerMove === 'paper'){
      result = 'Tie';
    }else if (computerMove === 'scissors'){
      result = 'You Lose';
    }

  } else if (playerMove === 'rock'){
    if (computerMove === 'rock'){
      result = 'Tie';
    }else if (computerMove === 'paper'){
      result = 'You Lose';
    }else if (computerMove === 'scissors'){
      result = 'You Win';
    }
  }

  if(result === 'You Win'){
    score.wins +=1;
  }else if(result === 'You Lose'){
    score.losses +=1;
  }else if(result === 'Tie'){
    score.ties +=1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  
  updateScoreElement();
  
  document.querySelector('.js-result')
    .innerHTML =result;

  document.querySelector('.js-moves')
    .innerHTML = `You
<img src="images/${playerMove}-emoji.png" alt="Rock" class="move-icon">
<img src="images/${computerMove}-emoji.png" alt="Scissors" class="move-icon">
Computer`;

}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}` 
}

function pickComputerMove(){
  const randomNumber = Math.random();

  let computerMove = '';

  if(randomNumber >=0 && randomNumber < 1 / 3){
    computerMove = 'rock';
  } else if (randomNumber >=1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'scissors'
  }

  return computerMove;
}
