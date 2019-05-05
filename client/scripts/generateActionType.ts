const modules: Array<{ name: string, specialPath?: string, actions: Action[] }> = [
  {
    name: 'root', specialPath: 'root',
    actions: [
      {type: 'initializeComplete', template: 'sync'},
      {type: 'initializeFail', template: 'sync'},
      {type: 'error', template: 'sync'},
    ],
  },
  {
    name: 'account',
    actions: [
      {type: 'login', template: 'async'},
      {type: 'logout', template: 'async'},
      {type: 'getAccountUser', template: 'async'},
    ],
  },
  {
    name: 'user',
    actions: [
      {type: 'getUserById', template: 'async'},
    ],
  },
  {
    name: 'calendar',
    actions: [],
  },
  {
    name: 'form',
    actions: [],
  },
  {
    name: 'map',
    actions: [],
  },
  {
    name: 'report',
    actions: [],
  },
  {
    name: 'richTextEditor',
    actions: [],
  },
  {
    name: 'table',
    actions: [],
  },
  {
    name: 'settings',
    actions: [],
  },
];

const actionTypesFileName = 'types.ts';

const generatedFileHeader =
  `/**
 * This file auto generated by script. Do not change it manually!!!
 * @see scripts/generateActionType.ts
 *
 */

import {createStandardAction, createAsyncAction} from 'typesafe-actions';

`;

import * as fs from 'fs';
import * as path from 'path';

type Action = {
  type: string
  template: 'sync' | 'async',
};

const asyncActionTemplate = {
  request: 'request',
  success: 'success',
  failure: 'failure',
};

/**
 * Action types code generator
 * @param moduleList
 */
const generator = (moduleList: typeof modules) => {
  logger('Generate action types...');

  let moduleActionTypesFile: number;
  moduleList.forEach(module => {
    const moduleActionsPath = module.specialPath
      ? path.join(__dirname, '..', 'src', module.specialPath, 'actions', actionTypesFileName)
      : path.join(__dirname, '..', 'src', 'modules', module.name, 'actions', actionTypesFileName);

    if (module.actions.length > 0) {
      logger(`Generate action for ${module.name} path ${moduleActionsPath}`);

      moduleActionTypesFile = fs.openSync(moduleActionsPath, 'a');
      clearFile(moduleActionTypesFile);
      appendHeader(moduleActionTypesFile);
      try {
        module.actions.forEach(action => {
          const types = createActionTypeValues(module.name, action);
          types.forEach(type => {
            checkActionTypeUnique(type.value);
            const actionTypeCode = createActionTypeTSCode(type);
            fs.appendFileSync(moduleActionTypesFile, actionTypeCode);
          });
          const actionCreatorCode = createActionCreatorTSCode(module.name, action);
          fs.appendFileSync(moduleActionTypesFile, actionCreatorCode);
        });
      } catch (error) {
        throw new Error(`Error generate action types (module ${module.name}): ` + error);
      } finally {
        fs.closeSync(moduleActionTypesFile);
      }
    }
  });
};

function clearFile(descriptor: number) {
  fs.ftruncateSync(descriptor, 0);
}

function appendHeader(descriptor: number) {
  fs.appendFileSync(descriptor, generatedFileHeader);
}

const actionTypes = new Set<string>();

function checkActionTypeUnique(type: string) {
  if (actionTypes.has(type)) {
    throw new Error(`Action type ${type} already exist`);
  } else {
    actionTypes.add(type);
  }
}

const createConstantName = (str: string) => str.split(/(?=[A-Z])/).join('_').toUpperCase();

const createActionTypeName = (moduleName: string, type: Action) => moduleName + '_' + type.type;
const createActionTypeValue = (moduleName: string, type: Action) => '@' + moduleName + '/' + type.type;

function createActionTypeValues(moduleName: string, type: Action): Array<{ name: string, value: string }> {
  const actionTypeName = createActionTypeName(moduleName, type);
  const actionTypeValue = createActionTypeValue(moduleName, type);

  const result = new Array<{ name: string, value: string }>();
  if (type.template === 'async') {
    result.push({
      name: createConstantName(actionTypeName + '_' + asyncActionTemplate.request),
      value: createConstantName(actionTypeValue + '/' + asyncActionTemplate.request),
    });
    result.push({
      name: createConstantName(actionTypeName + '_' + asyncActionTemplate.success),
      value: createConstantName(actionTypeValue + '/' + asyncActionTemplate.success),
    });
    result.push({
      name: createConstantName(actionTypeName + '_' + asyncActionTemplate.failure),
      value: createConstantName(actionTypeValue + '/' + asyncActionTemplate.failure),
    });
  } else {
    result.push({name: createConstantName(actionTypeName), value: createConstantName(actionTypeValue)});
  }
  return result;
}

const newLine = '\n';

function createActionTypeTSCode({name, value}: { name: string, value: string }): string {
  return `const ${name} = '${value}';` + newLine;
}

function createActionCreatorTSCode(moduleName: string, type: Action) {
  const actionTypeName = createActionTypeName(moduleName, type);
  if (type.template === 'async') {
    const asyncActionTypeNames =
      createConstantName(actionTypeName + '_' + asyncActionTemplate.request) + ', '
      + createConstantName(actionTypeName + '_' + asyncActionTemplate.success) + ', '
      + createConstantName(actionTypeName + '_' + asyncActionTemplate.failure) + ',';
    return `export const ${type.type}Creator = createAsyncAction(` + newLine
      + `   ${asyncActionTypeNames}` + newLine
      + `);` + newLine;
  }
  return `export const ${type.type}Creator = createStandardAction(${createConstantName(actionTypeName)});`
    + newLine;
}

function logger(text: string) {
  console.log(text);
}

generator(modules);
