#!/usr/bin/env node

import { program } from "commander";
import { createApp } from "./commands/create.js";
import { addPage } from "./commands/addPage.js";
import { addRoute } from "./commands/addRoute.js";

program
  .version("1.0.0")
  .description("create-shadcn-dashboard");

program
  .command("create [name]")
  .description("Create a new Shadcn Dashboard app")
  .action(async (name) => {
    await createApp(name);
  });

program
  .arguments("[name]")
  .action(async (name) => {
    if (name) {
      await createApp(name);
    } else {
      program.help();
    }
  });

program
  .command("add <type> [name]")
  .description("Add a new page or route to an existing app")
  .action(async (type, name) => {
    if (type === "page") {
      await addPage(name);
    } else if (type === "route") {
      await addRoute(name);
    } else {
      console.error("Invalid type. Use 'page' or 'route'.");
    }
  });

program.parse(process.argv);