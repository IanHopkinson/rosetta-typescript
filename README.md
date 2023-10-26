# Rosetta - TypeScript

## About

This GitHub repo accompanies a [blog post]() which describes the tooling ecosystem for TypeScript. This repo provides the technical details in a concise form to accompany the more discussive blog post.

## TypeScript compilers and runtimes

TypeScript is often run on the `node.js` runtime which can be installed from [here](https://pages.github.com/). On Windows this
is quick and straightforward but is followed by a lengthy install process for Visual Studio build tools, the chocolatey package manager and Python.

Once `node.js` has been installed, then TypeScript is then installed globally with:

```shell
npm install typescript --g
```

However, for the purposes of this project we will make a project-level installation using the `--save-dev` flag.

```shell
npm install typescript --save-dev
```

It is worth noting here that most "getting started" guides are based on a global install and thus will not work without modifying paths for `tsc` and other tools if a project-level installation is done. Microsoft Visual Code finds project-level installed tools automatically.

Given this project-level installation then your programme is then compiled with:

```shell
./node_modules/typescript/.bin/tsc hello_world.ts
```

By default this will produce a compiled `hello_world.js` file which sits alongside the TypeScript source code file.

The compiled code can then be run with:

```shell
node hello_world.js
```

The `tsc` compiler is configured using a `tsconfig.json` file, a template for which can be produced using the command:

```shell
tsc --init
```

## TypeScript Package Management

TypeScript package management is typically done using the `npm` package manager, installed with node.js.

`npm init` will produce a `package.json` file based on your responses to requests for metadata which describes your package.

Subsequently installing further packages, such as `typescript` using the `--save-dev` will create a a node_modules directory, a `package-lock.json` file and will update the `package.json` file. `package-lock.json` is a description of exactly what is installed and should be committed to source control.

## Virtual Environments

The virtual environment for TypeScript is largely determined by the local copy of the dependencies. The node version can also be set in
the `package.json`:

```json
 "engines": {
    "node": ">18.0.0"
  }
```

npm has a neat feature whereby command line invocations of tools can be specified in `package.json` and invoked with `npm run {invocation-name}`. For this project the `scripts` section looks like this:

```json
"scripts": {
    "test": ".\\node_modules\\.bin\\jest --watch",
    "compile": ".\\node_modules\\.bin\\tsc",
    "lint": ".\\node_modules\\.bin\\eslint src tests",
    "prettier-check": ".\\node_modules\\.bin\\prettier . --check",
    "prettier-fix": ".\\node_modules\\.bin\\prettier . --write",
    "make-docs": ".\\node_modules\\.bin\\typedoc --out docs src/maths_funcs.ts"
  },
```

The tools used in this set of invocations will be described below.

## Project Layout

The `package.json` file sits in the root of the project with a `node_module` directory sitting underneath that. Based on [this](https://github.com/microsoft/TypeScript-Node-Starter/blob/master/README.md#project-structure) Microsoft example starter project suggests the following sub-directories:

- `src` - to contain project source TypeScript files
- `dist` - to contain compiled JavaScript files, this needs to be specified in the `outDir` key of the `tsconfig.json` file
- `tests` - to contain project test TypeScript files
- `docs` - to contain generated HTML documentation files from TypeDoc.

The root of the project also contains configuration files for other tools used in the project (`tsc`, `jest`, `eslint`, and `prettier`). These tools can be configured in multiple ways, here it is done with `json` format files although their contents could be added under their own keys to the `package.json` file except for `tsc` which uses the separate `tsconfig.json` file.

## Testing

Testing in this project is using the [Jest](https://jestjs.io/) library, installed with:

```shell
npm install jest ts-jest @types/jest --save-dev
```

Tests are put in the `tests` directory and run with:

```shell
npm run test
```

This works because we made a `test` entry in the `package.json` file. `Jest` is configured using a
file in the root of the project, here it is `jest.config.json` which reads:

```json
{
  "transform": { "^.+\\.ts?$": "ts-jest" },
  "testEnvironment": "node",
  "testRegex": "/tests/.*\\.(test|spec)?\\.(ts|tsx)$",
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]
}
```

It is possible to configure `Jest` in the `package.json` file, a JavaScript file or a TypeScript file. I chose a separate JSON file
because for an example it is clearer and I prefer configuration to be data rather than executable.

## Static analysis and formatting tools

This project uses [eslint](https://typescript-eslint.io/) for static analysis and [prettier](https://prettier.io/) for formatting.

For TypeScript `eslint` is installed with:

```shell
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
```

In common with `jest` there are multiple ways of providing configuration. In this project it is done with the `.eslintrc.json` file:

```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "root": true
}
```

Linting is run with:

```shell
npm run lint
```

`prettier` is installed with:

```shell
npm install --save-dev prettier
```

The `prettier` formatter has the same philosophy as the Python `black` formatter which is to say it is opinionated and so I decided
to do no additional configuration. An ignore pattern is included in the `.prettierignore` file to exclude the compiled JavaScript files
and :

```text
# Ignore artifacts:
dist
node_modules
```

Two `prettier` scripts are used, the first simply checks files:

```shell
npm run prettier-check
```

The second will re-write files:

```shell
npm run prettier-fix
```

## Documentation Generation

Documentation for this project is by [TypeDoc](https://typedoc.org/) which is installed with:

```shell
npm install typedoc --save-dev
```

It is invoked with the following which is defined by the "scripts" entry

```shell
npm run make-docs
```

## Visual Studio Code

As a personal choice, I use Visual Studio Code. For this project I installed the [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension, the [jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) extension, and the [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension.
The TypeScipt support is built in to Visual Studio Code. The configuration for Code is found in the `.vscode` directory of this repo.
