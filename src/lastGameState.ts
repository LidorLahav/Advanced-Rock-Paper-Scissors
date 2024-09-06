import fs from 'fs';

export interface GameState {
    player1Score: number;
    player2Score: number;
    currentRound: number;
    numberOfRounds: number;
    numberOfHands: number;
    player1Type: string;
    player2Type: string;
}

export function saveGameState(gameState: GameState) {
    fs.writeFileSync('gameState.json', JSON.stringify(gameState));
}

export function loadGameState(): GameState | null {
    if (fs.existsSync('gameState.json')) {
        const data = fs.readFileSync('gameState.json', 'utf8');
        return JSON.parse(data);
    }
    return null;
}

export function removeGameState() {
    fs.unlinkSync('gameState.json');
}