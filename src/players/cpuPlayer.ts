import { PlayerInterface } from './playerInterface.js';

export class CpuPlayer implements PlayerInterface {
    isMonkey: boolean;

    constructor (isMonkey: boolean = false) {
        this.isMonkey = isMonkey;
    }

    getHands = async (numberOfHands: number): Promise<string[]> => {
        const hands = ['Rock', 'Paper', 'Scissors'];
        let handsToReturn = [];
        for (let index = 0; index < numberOfHands; index++) {
            const randomIndex = Math.floor(Math.random() * hands.length);
            const hand = hands[randomIndex];
            if(this.isMonkey) {
                handsToReturn = new Array(numberOfHands).fill(hand);
                break;
            }
            handsToReturn.push(hand);
        }
        return handsToReturn;
    };

    getHand = (): string => {
        const hands = ['Rock', 'Paper', 'Scissors'];
        const randomIndex = Math.floor(Math.random() * hands.length);
        return hands[randomIndex];
    };
  
}
