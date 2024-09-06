// game.ts
import { GameState, saveGameState } from './lastGameState.js';
import { CpuPlayer } from './players/cpuPlayer.js';
import { HumanPlayer } from './players/humanPlayer.js';
import { PlayerInterface } from './players/playerInterface.js';

export class Game {

    player1: PlayerInterface;
    player2: PlayerInterface;
    player1Type: string;
    player2Type: string;
    currentRound: number;
    numberOfRounds: number;
    numberOfHands: number;
    player1Score: number;
    player2Score: number;

    constructor(player1: PlayerInterface, player2: PlayerInterface, gameState: GameState) {
        this.player1 = player1;
        this.player2 = player2;
        this.numberOfRounds = gameState.numberOfRounds;
        this.currentRound = gameState.currentRound;
        this.numberOfHands = gameState.numberOfHands;
        this.player1Score = gameState.player1Score;
        this.player2Score = gameState.player2Score;
        this.player1Type = gameState.player1Type;
        this.player2Type = gameState.player2Type;
    }

    async play() {
        if (this.player1Type === this.player2Type && this.player1Type === "Cpu") {
            await this.playCpuGame();
        } else {
            await this.playRegularGame();
        }
        this.announceTheWinnerInTotal(this.player1Score, this.player2Score);
    }

    playCpuGame = async () => {
        const p1Hand = this.player1 instanceof CpuPlayer && this.player1.getHand();
        const p2Hand = this.player2 instanceof CpuPlayer && this.player2.getHand();
        const winnerInRound: number = this.playRound([p1Hand], [p2Hand]);
        if (winnerInRound === 1) {
            this.player1Score++;
        } else if (winnerInRound === 2) {
            this.player2Score++
        }
    }

    playRegularGame = async () => {
        for (this.currentRound; this.currentRound < this.numberOfRounds; this.currentRound++) {
            console.log(`Round ${this.currentRound + 1}/${this.numberOfRounds}:`);
            if (this.player1 instanceof HumanPlayer) {
                console.log('Player 1:');
            }
            const p1Hands = await this.player1.getHands(this.numberOfHands);
            if (this.player2 instanceof HumanPlayer) {
                console.log('Player 2:');
            }
            const p2Hands = await this.player2.getHands(this.numberOfHands);
            const winnerInRound: number = this.playRound(p1Hands, p2Hands);
            if (winnerInRound === 1) {
                this.player1Score++;
            } else if (winnerInRound === 2) {
                this.player2Score++
            }
            this.announceTheWinnerInRound(this.currentRound + 1, winnerInRound);
            console.log(`After round ${this.currentRound + 1}: Player 1 - ${this.player1Score}, Player 2 - ${this.player2Score}`);
            saveGameState({
                numberOfRounds: this.numberOfRounds,
                currentRound: this.currentRound,
                numberOfHands: this.numberOfHands,
                player1Score: this.player1Score,
                player2Score: this.player2Score,
                player1Type: this.player1Type,
                player2Type: this.player2Type
            });
        }
    }

    playRound = (p1Hands: string[], p2Hands: string[]) => {
        const overcomes: { [key: string]: string} = {
          Rock: "Scissors",
          Paper: "Rock",
          Scissors: "Paper"
        };
      
        let player1Score = 0;
        let player2Score = 0;
      
        for (let i = 0; i < p1Hands.length; i++) {
          const player1Hand = p1Hands[i];
          const player2Hand = p2Hands[i];
          if (overcomes[player1Hand] === player2Hand) {
            player1Score++;
          } else if (overcomes[player2Hand] === player1Hand) {
            player2Score++;
          }
        }
      
        if (player1Score > player2Score) {
          return 1;
        } else if (player1Score < player2Score) {
          return 2;
        } else {
          return -1;
        }
    }
      
    announceTheWinnerInRound = (roundNumber: number, winnerInRound: number) => {
        if (winnerInRound === 1) {
            console.log(`Player 1 wins round ${roundNumber}`);
        } else if (winnerInRound === 2) {
            console.log(`Player 2 wins round ${roundNumber}`);
        } else {
            console.log(`Round ${roundNumber} ends with a tie!`);
        }
    } 
    
    announceTheWinnerInTotal = (player1Score: number, player2Score: number) => {
        if (player1Score > player2Score) {
            console.log(`Player 1 wins the game!!!`);
        } else if (player1Score < player2Score) {
            console.log(`Player 2 wins the game!!!`);
        } else {
            console.log(`It's a tie!`);
        }
    } 
}
