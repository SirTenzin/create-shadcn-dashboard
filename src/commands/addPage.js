import inquirer from "inquirer";
import { addFile, updateFile } from "../utils/file.js";
import Logger from "../utils/logger.js";
import path from "path";

const logger = new Logger();

export async function addPage(name) {
  let pageName = name;

  if (!pageName) {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "pageName",
        message: "Enter the name of the page:",
        default: "example"
      }
    ]);
    pageName = answer.pageName;
  }

  const pageContent = `
import React from 'react';

export default function ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page() {
  return (
    <div>
      <h1>${pageName} Page</h1>
    </div>
  );
}
`;

  await addFile(process.cwd(), `app/dashboard/${pageName}/page.tsx`, pageContent);
  logger.prefixSuccess(`Page '${pageName}' has been added successfully!`);
  
  const dataFilePath = path.join(process.cwd(), 'constants', 'data.ts');
  const newNavItem = `{
    title: '${pageName.charAt(0).toUpperCase() + pageName.slice(1)}',
    href: '/dashboard/${pageName}',
    icon: 'dashboard',
    label: '${pageName.charAt(0).toUpperCase() + pageName.slice(1)}'
  }`;

  await updateFile(dataFilePath, (content) => {
    const navItemsRegex = /export const navItems: NavItem\[\] = \[([\s\S]*?)\];/;
    const match = content.match(navItemsRegex);

    if (match) {
      const existingItems = match[1].trim();
      const updatedItems = existingItems ? `${existingItems},\n  ${newNavItem}` : newNavItem;
      return content.replace(navItemsRegex, `export const navItems: NavItem[] = [\n  ${updatedItems}\n];`);
    }

    return content;
  });

  logger.prefixSuccess(`Updated 'data.ts' with new nav item for '${pageName}'`);
}