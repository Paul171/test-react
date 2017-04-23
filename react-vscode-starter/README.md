# React + Visual Studio Code Starter

## Overview

This project configuration bundles JavaScript files with Webpack 2 transpiling ES2017 and JSX code to run in an ES5.1 environment.

## Application Setup

Step 1. Install Node.js version 6 or higher. To install Node.js click [here](https://nodejs.org).

Step 2. Download this repository. Extract the zip file to a working folder on your system.

Step 3. Open a terminal window, change to the folder where you extracted the zip file. You should see a **package.json** file in the folder.

On Windows, the terminal is called "Node.js Command Prompt". This will command prompt will contain the proper paths for Node.js development. DO NOT RUN the Node.js program. Click the icon named "Node.js Command Prompt". For Mac users, the Mac terminal is all you need.

Step 4. From the terminal, run the following command:

```bash
npm i && npm start
```

It could take a few minutes for this command to complete. If you have connection issues due to a proxy server, please edit the **.npmrc** file per the instructions in those files. Then re-run the command above.

This setup has been completed successfully when you receive a message similar to this one:

```bash
[0] Hash: 22b8756ee9084e76420f
[0] Version: webpack 1.14.0
[0] Time: 3731ms
[0]                     Asset       Size  Chunks             Chunk Names
[0]                    app.js     906 kB       0  [emitted]  app
[0]                app.js.map    1.08 MB       0  [emitted]  app
[0] ../images/placeholder.txt   20 bytes          [emitted]
[0]             ../index.html  300 bytes          [emitted]
[0]     + 186 hidden modules
[1] [BS] File changed: dist/js/app.js
[1] [BS] File changed: dist/images/placeholder.txt
[1] [BS] File changed: dist/js/app.js.map
[1] [BS] File changed: dist/index.html
```

This terminal window is now running the web server, a second terminal window will need to be opened to run additional terminal commands.

Step 5. If a web browser did not open automatically for you, then open a web browser, and navigate to [http://localhost:5000](http://localhost:5000).  The React web application should load and be usable.

### To Modify the Web Application

Step 6. Open [Visual Studio Code](https://code.visualstudio.com), and modify the files in the **src** folder. When file changes are saved, **Webpack 2** will automatically transpile and bundle the application code and assets, and deploy it to the **dist** folder. Live reload is turned on, so your web browser should reload automatically.

#### Recommended Editor Packages/Extensions

For Visual Studio Code:

- HTMLHint (kaufman.HTMLHint)
- ESLint (dbaeumer.vscode-eslint)
- SASS Lint (glen-84.sass-lint)

Visual Studio Code has built-in support for JSX and a Terminal, no additional packages need to be installed

## NPM Scripts Command Reference

From a terminal, in the root project folder (where the **package.json** file exists), the following commands can be executed to perform various project development tasks.

- **npm start** - removes the dist folder, builds and deploys the web app, and starts the web app and the rest app
- **npm run clean** - removes the **dist** folder
- **npm run webpack:w** - runs webpack in watch mode so web app file changes are automatically processed, and deployed to the **dist** folder
- **npm run webpack** - runs webpack once to process web app files, and deploys them to the **dist** folder
- **npm run web** - starts the web server
- **npm run rest** - starts the rest server

## Useful Resources

- [React](https://facebook.github.io/react/)
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.github.io/)
- [SASS](http://sass-lang.com/)
- [Bootstrap](https://v4-alpha.getbootstrap.com/)
