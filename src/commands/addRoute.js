import inquirer from "inquirer";
import { addFile } from "../utils/file.js";
import Logger from "../utils/logger.js";

const logger = new Logger();

export async function addRoute(name) {
  let routeName = name;

  if (!routeName) {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "routeName",
        message: "Enter the name of the API route:",
        default: "example"
      }
    ]);
    routeName = answer.routeName;
  }

  const routeContent = `
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello from ${routeName} API route!' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ message: 'POST request received', data: body });
}
`;

  await addFile(process.cwd(), `app/api/${routeName}/route.ts`, routeContent);
  logger.prefixSuccess(`API route '${routeName}' has been added successfully!`);
}