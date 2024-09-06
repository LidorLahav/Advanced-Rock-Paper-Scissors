import { GameHelper } from './gameHelper.js';
import { HumanPlayer } from './players/humanPlayer.js';
import { loadGameState, GameState, saveGameState, removeGameState } from './lastGameState.js';
import { CpuPlayer } from './players/cpuPlayer.js';
import { Game } from './game.js';

const run = async () => {
  let gameState: GameState = loadGameState();
  let resume = false;
  if (gameState) {
    resume = (await GameHelper.resumeLastGame('A previous game was found. Do you want to resume it?')).resume;
    if (!resume) {
      removeGameState();
    }
  }
  if (resume) {
    console.log('Resuming saved game...');
  } else {
    const numberOfHands = Number(GameHelper.getValueFromArgs("numberOfHands") || (await GameHelper.chooseNumberOfHands('How many hands do you want to play?')).hands);
    const numberOfRounds = Number(GameHelper.getValueFromArgs("numberOfRounds") || (await GameHelper.chooseNumberOfRounds('How many rounds do you want to play?')).rounds);
    const player1Type = GameHelper.getValueFromArgs(`player1Type`) || (await GameHelper.choosePlayerType('Choose player 1 type'));
    const player2Type = GameHelper.getValueFromArgs(`player2Type`) || (await GameHelper.choosePlayerType('Choose player 2 type'));
    gameState = { player1Score: 0, player2Score: 0, currentRound: 0, numberOfRounds: numberOfRounds, numberOfHands: numberOfHands, player1Type: player1Type, player2Type: player2Type };
  }
  await startGame(gameState);
  removeGameState();
  console.log('Thanks for playing! Goodbye.');
};

const startGame = async (gameState: GameState) => {
  const player1 = gameState.player1Type === "Human" ? new HumanPlayer() : gameState.player1Type === "Cpu" ?  new CpuPlayer(false) : new CpuPlayer(true);
  const player2 = gameState.player2Type === "Human" ? new HumanPlayer() : gameState.player2Type === "Cpu" ?  new CpuPlayer(false) : new CpuPlayer(true);

  const game = new Game(player1, player2, gameState);
  await game.play();
  
}

run();
