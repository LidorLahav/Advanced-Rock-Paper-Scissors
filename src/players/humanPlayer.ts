import { GameHelper } from '../gameHelper.js';
import { PlayerInterface } from './playerInterface.js';

export class HumanPlayer implements PlayerInterface {

  getHands = async (numberOfHands: number): Promise<string[]> => {
    const hands = [];
    for (let index = 0; index < numberOfHands; index++) {
      const hand = await GameHelper.chooseHand(`Choose hand (${index + 1}/${numberOfHands})`)
      hands.push(hand);
    }
    return hands;
  };

}
