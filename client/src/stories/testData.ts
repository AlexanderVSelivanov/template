import {AccountDto, NoteDto, UserDto} from 'template-common';
import {AppNotification,  AppNotificationPriority} from '../types/AppNotification';

export const userEntityDto1: UserDto = {
  entity: {
    id: 1,
    created: new Date(),
    updated: new Date(),
  },
  firstName: 'John',
  lastName: 'Smith',
  email: 'JohnSmith@email.test',
  disable: false,
};

export const accountEntityDto1: AccountDto = {
  entity: {
    id: 1,
    created: new Date(),
    updated: new Date(),
  },
  username: 'johnsmith',
  password: 'password',
  disable: false,
  user: userEntityDto1,
};

export const userEntityDto1WithAccount: UserDto = {
  entity: {
    id: 2,
    created: new Date(),
    updated: new Date(),
  },
  firstName: 'John',
  lastName: 'Smith ',
  email: 'JohnSmith@email.test',
  disable: false,
  account: accountEntityDto1,
};

export const userEntityDto2: UserDto = {
  entity: {
    id: 1,
    created: new Date(),
    updated: new Date(),
  },
  firstName: 'Tom',
  lastName: 'Trump',
  email: 'TomTrump@email.test',
  disable: false,
};

export const noteEntityDto1: NoteDto = {
  entity: {
    id: 1,
    created: new Date(),
    updated: new Date(),
  },
  title: 'Test Note 1',
  text: 'test note text',
  tags: ['tag1', 'tag2'],
};

export const noteEntityDto2: NoteDto = {
  entity: {
    id: 2,
    created: new Date(),
    updated: new Date(),
  },
  title: 'Test Note 2',
  text: 'test note 2 text',
  tags: ['tag3', 'tag4'],
};

export const appNotification: AppNotification = {
  created: new Date(),
  priority: AppNotificationPriority.Information,
  text: 'Test notification',
};
