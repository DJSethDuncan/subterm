# SubTerm

A terminal based adventure game in development.

You are stuck in a submarine. There is no power. You only have access to an emergency ship terminal with a basic OS operating on the sub. You must rescue yourself before your air runs out.

## How to play

Type a command into the terminal and press Enter.

| Command | What it does |
| --- | --- |
| `help` | Lists the available commands. |
| `ls` | Shows the sub's file system. |
| `cd <folder>` | Opens a folder. |
| `exit` | Returns to the start screen. |

## Run it locally

Requires Node.js and npm.

```bash
npm install
npm start
```

The game opens at http://localhost:3000.

## Other scripts

- `npm test`: runs the test suite.
- `npm run build`: builds the production bundle into `build/`.
