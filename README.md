# Create Shadcn Dashboard

A CLI tool to quickly set up a Next.js dashboard with Shadcn UI components and authentication.

## Features

- Next.js 14+ with App Router
- [Shadcn UI components](https://ui.shadcn.com)
- Authentication setup with [NextAuth.js](https://authjs.dev)
- Dashboard layout with sidebar and header
- Responsive design
- Zod schema validation, TailwindCSS styling, Pre-commit hooks via Husky, Prettier
- TypeScript support
- Boilerplate code from https://github.com/Kiranism/next-shadcn-dashboard-starter

## Getting Started

> To create a new dashboard project, run:

```bash
npx create-shadcn-dashboard my-app
```

<img src="https://i.imgur.com/Sow6suo.png" alt="Initial" width="800"/>

> To add a new page, run:

 ```bash
npx create-shadcn-dashboard my-app

```
<img src="https://i.imgur.com/sAAAIbY.png" alt="Add Page" width="800"/>

> To add a new API route, run:

```bash
npx create-shadcn-dashboard add route 
```

<img src="https://i.imgur.com/M0t2bDn.png" alt="Add Route" width="800"/>

## Running your app

```bash
cd my-app
npm run dev
```
<img src="https://i.imgur.com/iex0o8J.png" alt="Running your app" width="800"/> 

## Photo gallery

<details>

<summary>Photo Gallery (Click to expand)</summary>

| Description | Image |
|-------------|-------|
| Login screen (Dark mode) | ![Login screen](https://i.imgur.com/LmWPw2X.png) |
| Dashboard (Dark mode) | ![Dashboard](https://i.imgur.com/H4ew17E.png) |
| Login screen (Light mode) | ![LS Light](https://i.imgur.com/igs90sk.png) |
| Dashboard (Light mode) | ![DB Light](https://i.imgur.com/5lYNvCZ.png) |

</details>

## Notes

<details>

<summary>Notes (Click to expand)</summary>

- When starting your dashboard, you may find that the auth system lets you login with any set of emails or passwords, and that is because by default the auth.config.ts file doesnt check for anything.
- You can add your own providers to the auth.config.ts file and that will be used to check for valid logins.

</details>
