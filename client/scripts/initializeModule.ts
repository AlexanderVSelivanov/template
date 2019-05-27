import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readLine(question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

const createFolder = (paths: string[]) => {
  const folderPath = path.join(...paths);
  fs.mkdirSync(folderPath);
};
const createFile = (paths: string[]) => {
  const filePath = path.join(...paths);
  fs.writeFileSync(filePath, '');
};

async function initialize() {
  try {
    const moduleNameInput = await readLine('Module name: ');
    const modulePathInput = await readLine('Module path (empty to use same as name): ');
    const modulePath =
      path.join(__dirname, '..', 'src', 'modules', modulePathInput ? modulePathInput : moduleNameInput);

    const modulePathExist = fs.existsSync(modulePath);
    if (modulePathExist) {
      throw new Error(`Module path already exist (${modulePath})`);
    }

    const folders = [
      [modulePath],
      [modulePath, 'actions'],
      [modulePath, 'sagas'],
      [modulePath, 'types'],
      [modulePath, 'view'],
      [modulePath, 'view', 'pages'],
      [modulePath, 'view', 'components'],
    ];
    folders.forEach(createFolder);

    const files = [
      [modulePath, 'index.ts'],
      [modulePath, 'actions', 'index.ts'],
      [modulePath, 'sagas', 'index.ts'],
    ];
    files.forEach(createFile);

  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error('ERROR: ', e);
  } finally {
    rl.close();
  }
}

initialize();
