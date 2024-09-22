# PVX DASHBOARD 🚀

Admin dashboard for [PVX Website](https://pvxcommunity.com) !

## Tech Stack

- Vite + React + TypeScript
- Shadcn + Tailwind css
- React Query
- React Hook Form + Zod

## Run Locally

```bash
$ git clone https://github.com/Shubhamrawat5/PVX-DASHBOARD.git
$ cd PVX-DASHBOARD
$ npm install
$ npm run dev
```

## Branching Strategy

The project uses a three-branch strategy for development:

- **dev**: This is the development branch where all pull requests (PRs) and development occur.
- **staging**: After development, changes are merged into the staging branch for testing.
- **prod**: Once testing is complete, changes from staging are deployed to the production branch.

### Steps for Contribution

1. Check the issues for the list of changes required.
2. Ask the moderators to assign the issue to you.
3. Fork the repo and untick the 'Copy the prod branch only'.
4. Make the branch from `dev` for your changes.
5. Send the PR for review and set the target branch to `dev`.

