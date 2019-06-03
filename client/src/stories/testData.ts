import {AccountEntityDto, NoteEntityDto, UserEntityDto} from 'template-common';
import {AppNotification,  AppNotificationPriority} from '../types/AppNotification';

export const userEntityDto1: UserEntityDto = {
  id: 1,
  firstName: 'John',
  lastName: 'Smith',
  email: 'JohnSmith@email.test',
  created: new Date(),
  updated: new Date(),
  disable: false,
};

export const accountEntityDto1: AccountEntityDto = {
  id: 1,
  username: 'johnsmith',
  password: 'password',
  created: new Date(),
  updated: new Date(),
  disable: false,
  user: userEntityDto1,
};

export const userEntityDto1WithAccount: UserEntityDto = {
  id: 2,
  firstName: 'John',
  lastName: 'Smith ',
  email: 'JohnSmith@email.test',
  created: new Date(),
  updated: new Date(),
  disable: false,
  account: accountEntityDto1,
};

export const userEntityDto2: UserEntityDto = {
  id: 1,
  firstName: 'Tom',
  lastName: 'Trump',
  email: 'TomTrump@email.test',
  created: new Date(),
  updated: new Date(),
  disable: false,
};

export const noteEntityDto1: NoteEntityDto = {
  id: 1,
  title: 'Test Note 1',
  text: 'test note text',
  tags: ['tag1', 'tag2'],
  created: new Date(),
  updated: new Date(),
  disable: false,
};

export const noteEntityDto2: NoteEntityDto = {
  id: 2,
  title: 'Test Note 2',
  text: 'test note 2 text',
  tags: ['tag3', 'tag4'],
  created: new Date(),
  updated: new Date(),
  disable: false,
};

export const appNotification: AppNotification = {
  created: new Date(),
  priority: AppNotificationPriority.Information,
  text: 'Test notification',
};
