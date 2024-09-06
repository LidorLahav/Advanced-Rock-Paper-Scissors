import inquirer from "inquirer";

export class GameHelper {

  static async resumeLastGame(message: string) {
    const resume = await inquirer.prompt([
      {
          type: 'confirm',
          name: 'resume',
          message
      }
    ]);
    return resume;
  }

  static async chooseNumberOfHands(message: string) {
    const hands = await inquirer.prompt([
      {
        type: 'input',
        name: 'hands',
        message,
        validate: (input) => !isNaN(input) && input > 0 ? true : 'Please enter a valid number of hands'
      },
    ]);
    return hands;
  }

  static async chooseNumberOfRounds(message: string) {
    const rounds = await inquirer.prompt([
      {
        type: 'input',
        name: 'rounds',
        message,
        validate: (input) => !isNaN(input) && input > 0 ? true : 'Please enter a valid number of rounds'
      },
    ]);
    return rounds;
  }

  static async choosePlayerType(message: string) {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message,
        choices: ['Human', 'Cpu', 'Monkey'],
      },
    ]);
    return answer.choice;
  }

  static async chooseHand(message: string) {
    const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message,
          choices: ['Rock', 'Paper', 'Scissors'],
        },
      ]);
    return answer.choice;
  }

  static getValueFromArgs = (key: string): string | undefined => {
    const args = process.argv.slice(2);

    for (let arg of args) {
      const [argKey, argValue] = arg.split('=');
      
      if (argKey === key) {
        return argValue;
      }
    }

    return undefined;
  }
}