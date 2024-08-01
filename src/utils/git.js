import { exec } from "child_process";
import util from "util";
import fs from "fs/promises";
import path from "path";
import ora from "ora";

const execAsync = util.promisify(exec);

async function checkGit() {
  try {
    await execAsync(`git -v`);
    return true;
  } catch (error) {
    return false;
  }
}

async function initGit(targetDir) {
    await execAsync(`git init`, { cwd: targetDir });
}

export async function initGit(targetDir) {
    const detectSpin = ora("Detecting git...").start();
    if(checkGit()) {
        detectSpin.succeed("Git detected");
        const initSpin = ora("Initialising git repository...").start();
        await initGit(targetDir);
        initSpin.succeed("Git initialised");
        return logger.success("Git repository initialised");
    } else {
        detectSpin.fail("Git not detected");
        return logger.warn("Git not detected, repository not initialised");
    }
}