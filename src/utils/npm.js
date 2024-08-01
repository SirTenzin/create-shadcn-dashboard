import { exec } from "child_process";
import util from "util";
import fs from "fs/promises";
import path from "path";
import ora from "ora";

const execAsync = util.promisify(exec);

async function checkPackageManager(command) {
  try {
    await execAsync(`${command} --version`);
    return true;
  } catch (error) {
    return false;
  }
}

export async function installDependencies(targetDir) {
  console.log("Detecting package manager...");
  
  const packageManagers = [
    { name: "bun", command: "bun install" },
    { name: "pnpm", command: "pnpm install" },
    { name: "yarn", command: "yarn" },
    { name: "npm", command: "npm install" }
  ];

  for (const pm of packageManagers) {
    if (await checkPackageManager(pm.name)) {
      const spinner = ora(`Installing dependencies using ${pm.name}...`).start();
      try {
        await execAsync(pm.command, { cwd: targetDir });
        spinner.succeed(`Dependencies installed successfully using ${pm.name}`);
      } catch (error) {
        spinner.fail(`Failed to install dependencies using ${pm.name}`);
        console.error(error);
      }
      return;
    }
  }

  console.log("No supported package manager found. Falling back to npm...");
  const spinner = ora("Installing dependencies using npm...").start();
  try {
    await execAsync("npm install", { cwd: targetDir });
    spinner.succeed("Dependencies installed successfully using npm");
  } catch (error) {
    spinner.fail("Failed to install dependencies using npm");
    console.error(error);
  }
}