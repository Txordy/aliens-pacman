import Board from './Board.js';
import Pacman from './Pacman.js';
import Alien from './Alien.js';
import { randomMovement, getCloserMovement } from './alienAlgorithms.js';
import { OBJECT_TYPE, LEVEL_MAP } from './vars.js';


let currentLevelInitialAliens;
let currentLevelInitialPacmanPosition;
let currentLevelPacmanSpeed;
let currentLevelPowerPillTime;
let currentLevelGlobalSpeed;


const currentLevel = LEVEL_MAP;
const currentLevelDots = currentLevel.filter(x => x === 2).length;

const homeWrapper = document.getElementById('home-wrapper');
const instructionsWrapper = document.getElementById('instructions-wrapper');
const gameWrapper = document.getElementById('game-wrapper');

const easyButton = document.getElementById('play-easy-button');
const mediumButton = document.getElementById('play-medium-button');
const hardButton = document.getElementById('play-hard-button');
const instructionsButton = document.getElementById('instructions-button');

const homeButtonFromInstructions = document.getElementById('home-button-from-instructions');

const gameGrid = document.getElementById('game');
const scoreTable = document.getElementById('score');
const startButton = document.getElementById('start-button');

let gameBoard;

let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

function playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
}

function gameOver(pacman) {
    playAudio('./sounds/death.wav');
    document.removeEventListener('keydown', e => pacman.handleKeyInput(e, gameBoard.objectExists));

    gameBoard.showGameStatus(gameWin);

    if(gameWin) {
        scoreTable.classList.add('hide');
    }

    clearInterval(timer);
    document.getElementById('home-button-from-game').addEventListener('click', goHome);
}

function checkCollision(pacman, aliens) {
    const collidedAlien = aliens.find(alien => pacman.pos === alien.pos);

    if(collidedAlien) {
        if(pacman.powerPill) {
            playAudio('./sounds/eat_alien.wav');
            gameBoard.removeObject(collidedAlien.pos, [
                OBJECT_TYPE.ALIEN,
                OBJECT_TYPE.SCARED,
                collidedAlien.name
            ]);
            collidedAlien.pos = collidedAlien.startPos;
        } else {
            gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
            gameBoard.rotateDiv(pacman.pos, 0);
            gameOver(pacman, gameGrid);
        }
    }
}

function gameLoop(pacman, aliens) {
    gameBoard.moveCharacter(pacman);
    checkCollision(pacman, aliens);

    aliens.forEach(alien => gameBoard.moveCharacter(alien, pacman.getPosition()));
    checkCollision(pacman, aliens);

    if(gameBoard.objectExists(pacman.pos, OBJECT_TYPE.DOT)) {
        playAudio('./sounds/munch.wav');
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
        gameBoard.dotCount--;
    }

    if(gameBoard.objectExists(pacman.pos, OBJECT_TYPE.PILL)) {
        playAudio('./sounds/pill.wav');
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);
        pacman.powerPill = true;
        clearTimeout(powerPillTimer);
        powerPillTimer = setTimeout(() => pacman.powerPill = false, currentLevelPowerPillTime);
    }

    if(pacman.powerPill != powerPillActive) {
        powerPillActive = pacman.powerPill;
        aliens.forEach(alien => alien.isScared = pacman.powerPill);
    }

    if(gameBoard.dotCount === 0) {
        gameWin = true;
        gameOver(pacman, aliens);
    }

    const levelPercentage = Math.round(100-(100*gameBoard.dotCount / currentLevelDots));
    scoreTable.innerHTML = `<div class="progress-bar" style="width:${levelPercentage}%"></div><div class="progress-text">${levelPercentage}%</div>`;
}

function startGame() {
    playAudio('./sounds/game_start.wav');

    gameWin = false;
    powerPillActive = false;

    scoreTable.classList.remove('hide');
    startButton.classList.add('hide');

    gameBoard.createGrid(currentLevel);

    const pacman = new Pacman(currentLevelPacmanSpeed, currentLevelInitialPacmanPosition);
    gameBoard.addObject(currentLevelInitialPacmanPosition, [OBJECT_TYPE.PACMAN]);

    document.addEventListener('keydown', (e) => {
        pacman.handleKeyInput(e, gameBoard.objectExists)
    })

    timer = setInterval(()=>gameLoop(pacman, currentLevelInitialAliens), currentLevelGlobalSpeed);
}

function goHome() {
    instructionsWrapper.classList.add('hide');
    gameWrapper.classList.add('hide');
    scoreTable.classList.add('hide');
    startButton.classList.remove('hide');
    var paras = document.getElementsByClassName('game-status');
    while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }
    homeWrapper.classList.remove('hide');
}

function showInstructions() {
    homeWrapper.classList.add('hide');
    gameWrapper.classList.add('hide');
    instructionsWrapper.classList.remove('hide');
}

function playEasy() {
    gameBoard = Board.createGameBoard(gameGrid, currentLevel);
    currentLevelInitialAliens = [
        // speed, startPos, movement, name
        new Alien(5, 188, randomMovement, OBJECT_TYPE.ALIEN_1),
        new Alien(5, 209, randomMovement, OBJECT_TYPE.ALIEN_2),
        new Alien(5, 230, randomMovement, OBJECT_TYPE.ALIEN_3),
        new Alien(4, 251, randomMovement, OBJECT_TYPE.ALIEN_4)
    ];
    currentLevelInitialPacmanPosition = 84;
    currentLevelPacmanSpeed = 2;
    currentLevelPowerPillTime = 10000;
    currentLevelGlobalSpeed = 80;
    homeWrapper.classList.add('hide');
    instructionsWrapper.classList.add('hide');
    gameWrapper.classList.remove('hide');
}
function playMedium() {
    gameBoard = Board.createGameBoard(gameGrid, currentLevel);
    currentLevelInitialAliens = [
        // speed, startPos, movement, name
        new Alien(3, 188, getCloserMovement, OBJECT_TYPE.ALIEN_1),
        new Alien(4, 209, getCloserMovement, OBJECT_TYPE.ALIEN_2),
        new Alien(3, 230, getCloserMovement, OBJECT_TYPE.ALIEN_3),
        new Alien(4, 251, getCloserMovement, OBJECT_TYPE.ALIEN_4)
    ];
    currentLevelInitialPacmanPosition = 84;
    currentLevelPacmanSpeed = 2;
    currentLevelPowerPillTime = 10000;
    currentLevelGlobalSpeed = 80;
    homeWrapper.classList.add('hide');
    instructionsWrapper.classList.add('hide');
    gameWrapper.classList.remove('hide');
}
function playHard() {
    gameBoard = Board.createGameBoard(gameGrid, currentLevel);
    currentLevelInitialAliens = [
        // speed, startPos, movement, name
        new Alien(2, 188, getCloserMovement, OBJECT_TYPE.ALIEN_1),
        new Alien(3, 209, getCloserMovement, OBJECT_TYPE.ALIEN_2),
        new Alien(2, 230, getCloserMovement, OBJECT_TYPE.ALIEN_3),
        new Alien(3, 251, getCloserMovement, OBJECT_TYPE.ALIEN_4)
    ];
    currentLevelInitialPacmanPosition = 84;
    currentLevelPacmanSpeed = 2;
    currentLevelPowerPillTime = 10000;
    currentLevelGlobalSpeed = 80;
    homeWrapper.classList.add('hide');
    instructionsWrapper.classList.add('hide');
    gameWrapper.classList.remove('hide');
}

easyButton.addEventListener('click', playEasy);
mediumButton.addEventListener('click', playMedium);
hardButton.addEventListener('click', playHard);
instructionsButton.addEventListener('click', showInstructions);
homeButtonFromInstructions.addEventListener('click', goHome);
startButton.addEventListener('click', startGame);
