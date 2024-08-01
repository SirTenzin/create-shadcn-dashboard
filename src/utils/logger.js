import chalk from "chalk";

export default class Logger {
  constructor() {
    this.logger = console;
  }

  log(message, color = "white") {
    return this.logger.log(chalk[color](message));
  }

  success(message) {
    return this.logger.log(chalk.green(message));
  }

  error(message) {
    return this.logger.log(chalk.red(message));
  }

  warn(message) {
    return this.logger.log(chalk.yellow(message));
  }

  fatal(message) {
    return this.logger.log(chalk.bgRed(message));
  }

  info(message) {
    return this.logger.log(chalk.blue(message));
  }

  prefixSuccess(message) {
    return this.logger.log(chalk.green("create-shadcn-dashboard:success") + " " + message);
  }

  prefixError(message) {
    return this.logger.log(chalk.red("create-shadcn-dashboard:error") + " " + message);
  }

  prefixInfo(message) {
    return this.logger.log(chalk.blue("create-shadcn-dashboard:info") + " " + message);
  }

  prefixCsd(message) {
    return this.logger.log(chalk.magenta("create-shadcn-dashboard") + " " + message);
  }
}