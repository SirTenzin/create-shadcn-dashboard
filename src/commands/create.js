import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { installDependencies } from "../utils/npm.js";
import { copyTemplateFiles } from "../utils/file.js";
import crypto from 'crypto';
import { initGit } from "../utils/git.js";

export async function createApp(name) {
  if(!name) {
    const inquirer = await import('inquirer');
    const answer = await inquirer.default.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'project-name',
        default: 'my-app'
      }
    ]);
    name = answer.appName;
  }

  const targetDir = path.join(process.cwd(), name);

  console.log(chalk.blue(`Creating a new Shadcn Dashboard app in ${targetDir}`));

  // Create the target directory
  await fs.ensureDir(targetDir);

  // Copy template files
  await copyTemplateFiles(targetDir);

  // Generate AUTH_SECRET
  const authSecret = crypto.randomBytes(32).toString('hex');

  // Create or update .env.local file
  const envPath = path.join(targetDir, '.env.local');
  const envContent = `AUTH_SECRET=${authSecret}\n`;

  await fs.writeFile(envPath, envContent, { flag: 'a' });

  console.log(chalk.green('AUTH_SECRET generated and added to .env.local'));

  // Install dependencies
  await installDependencies(targetDir);

  // Initialise git
  await initGit(targetDir);

  console.log(chalk.green(`Successfully created ${name}!`));
  console.log(chalk.yellow("To get started, run:"));
  console.log(chalk.cyan(`  cd ${name}`));
  console.log(chalk.cyan("  npm run dev"));
}