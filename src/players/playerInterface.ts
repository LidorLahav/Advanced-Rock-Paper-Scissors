export interface PlayerInterface {
    getHands(numberOfHands: number): Promise<string[]>;
}
