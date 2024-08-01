import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateDir = path.join(__dirname, "..", "template");

export async function copyTemplateFiles(targetDir) {
  await fs.copy(templateDir, targetDir);
}

export async function addFile(targetDir, filePath, content) {
  const fullPath = path.join(targetDir, filePath);
  await fs.ensureFile(fullPath);
  await fs.writeFile(fullPath, content);
}

export async function updateFile(filePath, updateFn) {
  const content = await fs.readFile(filePath, 'utf8');
  const updatedContent = updateFn(content);
  await fs.writeFile(filePath, updatedContent);
}