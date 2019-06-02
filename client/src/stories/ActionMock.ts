import {action} from '@storybook/addon-actions';

export default function ActionMock<T extends { type: string, payload?: object | null | void }>(payloadAction: T) {
  action(payloadAction.type)(payloadAction.payload);
  return payloadAction;
}
