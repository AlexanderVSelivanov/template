import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readLine(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  })
}

function createModuleFolders(modulePath: string) {
  fs.mkdirSync(modulePath);

  const actionPath = path.join(modulePath, 'actions');
  fs.mkdirSync(actionPath);

  const actionApi = path.join(modulePath, 'api');
  fs.mkdirSync(actionApi);

  const actionSagas = path.join(modulePath, 'sagas');
  fs.mkdirSync(actionSagas);

  const actionTypes = path.join(modulePath, 'types');
  fs.mkdirSync(actionTypes);
}

async function initialize() {
  try {
    const moduleNameInput = await readLine('Module name: ');
    const moduleName = moduleNameInput.toUpperCase();

    const modulePathInput = await readLine('Module path (empty to use same as name): ');
    const modulePath = path
      .join(
        __dirname, '..', 'src', 'modules',
        modulePathInput ? modulePathInput : moduleNameInput,
      );

    const modulePathExist = fs.existsSync(modulePath);
    if (modulePathExist)
      throw new Error(`Module path already exist (${modulePath})`);

    createModuleFolders(modulePath);

  } catch (e) {
    console.error('ERROR: ', e);
  } finally {
    rl.close();
  }
}

initialize();
