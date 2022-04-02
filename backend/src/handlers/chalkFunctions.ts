import chalk from 'chalk';

export const initMsg = (msg: string) => console.log(chalk.bold.blueBright(msg));
export const debug = (msg: string) => console.log(chalk.greenBright(msg));
export const error = (msg: string) => console.log(chalk.bold.red(msg));
export const warning = (msg: string) => console.log(chalk.hex('#FFA500')(msg));
