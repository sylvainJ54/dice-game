let scores, scoreRound, activePlayer, gamePlaying;

function init() {
    scores = [0, 0];
    scoreRound = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.js-btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        let dice = Math.floor(Math.random() * 6) + 1;

        let diceDOM = document.querySelector('.js-dice');
        diceDOM.style.display = 'block';
        diceDOM.src = `./assets/img/dice-${dice}.png`;

        if (dice !== 1) {
            scoreRound += dice;
            document.querySelector('#current-' + activePlayer).textContent = scoreRound;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.js-btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        scores[activePlayer] += scoreRound;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.js-dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.js-btn-newGame').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    scoreRound = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.js-dice').style.display = 'none';
}

init(); // Appel initial pour démarrer le jeu au chargement de la page
