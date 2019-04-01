import * as fs from 'fs';
import * as path from 'path';

const actionTypesFileName = 'types.ts';

/**
 * Module abstraction
 */
class Module {
  readonly path: string;
  readonly name: string;
  readonly actionTypes: Array<ActionType>;

  constructor(path: string, actionTypes: Array<ActionType>, name: string = path) {
    this.path = path === 'root' ? path : 'modules/' + path;
    this.actionTypes = actionTypes;
    this.name = name;
  }
}

/**
 * ActionType abstraction
 */
type ActionType = {
  name: string
  template: ActionTemplate
}

/**
 * ActionType generator templates
 */
enum ActionTemplate { sync, async }

/**
 * Helpers
 */
const
  sync = ActionTemplate.sync,
  async = ActionTemplate.async,
  actionType = (name: string, template = sync): ActionType => ({name, template}),
  asyncActionType = (name: string): ActionType => actionType(name, async),
  asyncActionTemplate = {
    request: 'request',
    success: 'success',
    failure: 'failure',
  };

/**
 * Modules and Actions
 */
const modules: Array<Module> = [
  new Module('root', [
    actionType('initializeComplete'),
    actionType('initializeFail'),
  ]),
  new Module('user', [
    asyncActionType('login'),
    asyncActionType('getUser'),
    actionType('getUserById'),
  ]),

  new Module('calendar', []),
  new Module('form', []),
  new Module('map', []),
  new Module('report', []),
  new Module('richTextEditor', []),
  new Module('table', []),

  new Module('settings', []),
];

const generatedFileHeader =
  `/**
* This file auto generated by script. Do not change it manually!!!
* @see scripts/generateActionType.ts
*
*/

import {createStandardAction, createAsyncAction} from 'typesafe-actions';

`;

/**
 * Action types code generator
 * @param modules
 */
const generator = (modules: Array<Module>) => {
  console.info('Generate action types...');

  let moduleActionTypesFile: number;
  modules.forEach(module => {
    const modulePath = path.join(__dirname, '..', 'src', module.path, 'actions');

    if (module.actionTypes.length > 0) {
      console.info(`Generate action for ${module.name} path ${modulePath}`);

      const actionTypesPath = path.join(modulePath, actionTypesFileName);
      moduleActionTypesFile = fs.openSync(actionTypesPath, 'a');
      clearFile(moduleActionTypesFile);
      appendHeader(moduleActionTypesFile);
      try {
        module.actionTypes.forEach(actionType => {
          const types = createActionTypeValues(module.name, actionType);
          types.forEach(type => {
            checkActionTypeUnique(type.value);
            const actionTypeCode = createActionTypeTSCode(type);
            fs.appendFileSync(moduleActionTypesFile, actionTypeCode);
          });
          const actionCreatorCode = createActionCreatorTSCode(module.name, actionType);
          fs.appendFileSync(moduleActionTypesFile, actionCreatorCode);
        });
      } catch (error) {
        console.error(`Error generate action types (module ${module.name}): `, error);
        throw error;
      } finally {
        fs.closeSync(moduleActionTypesFile);
      }
    }
  })
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
    throw new Error(`Action type ${type} already exist`)
  } else {
    actionTypes.add(type);
  }
}

const createConstantName = (str: string) => str.split(/(?=[A-Z])/).join('_').toUpperCase();

const createActionTypeName = (moduleName: string, actionType: ActionType) => moduleName + '_' + actionType.name;
const createActionTypeValue = (moduleName: string, actionType: ActionType) => '@' + moduleName + '/' + actionType.name;

function createActionTypeValues(moduleName: string, actionType: ActionType): Array<{ name: string, value: string }> {
  const actionTypeName = createActionTypeName(moduleName, actionType);
  const actionTypeValue = createActionTypeValue(moduleName, actionType);

  const result = new Array<{ name: string, value: string }>();
  if (actionType.template === ActionTemplate.async) {
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

function createActionCreatorTSCode(moduleName: string, actionType: ActionType) {
  const actionTypeName = createActionTypeName(moduleName, actionType);
  if (actionType.template === ActionTemplate.async) {
    const asyncActionTypeNames =
      createConstantName(actionTypeName + '_' + asyncActionTemplate.request) + ', '
      + createConstantName(actionTypeName + '_' + asyncActionTemplate.success) + ', '
      + createConstantName(actionTypeName + '_' + asyncActionTemplate.failure);
    return `export const ${actionType.name}Creator = createAsyncAction(` + newLine
      + `   ${asyncActionTypeNames}` + newLine
      + `);` + newLine + newLine;
  }
  return `export const ${actionType.name}Creator = createStandardAction(${createConstantName(actionTypeName)});` + newLine + newLine;
}

generator(modules);