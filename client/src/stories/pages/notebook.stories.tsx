import React from 'react';
import {storiesOf} from '@storybook/react';
import {withTheme} from 'root/view/theme';
import {Empty, setSuccessProperty} from 'template-common';
import {
  createNoteAction,
  deleteNoteByIdAction,
  getNoteByIdAction,
  getNotesAction,
  setUpdatedNoteEmptyAction,
  updateNoteByIdAction,
} from '../../modules/notebook/actions';
import ActionMock from '../ActionMock';
import {noteEntityDto1, noteEntityDto2} from '../testData';

import NotebookPage from 'modules/notebook/view/pages/main/page';

storiesOf('Pages - Notebook', module)
  .add(
    'Notebook page',
    () => withTheme(
      <NotebookPage
        notes={setSuccessProperty({count: 1, items: [noteEntityDto1, noteEntityDto2]})}
        note={setSuccessProperty(noteEntityDto1)}
        createdNote={Empty}
        updatedNote={Empty}
        deletedNote={Empty}
        getNotes={() => ActionMock(getNotesAction.request({skip: 0, take: 20}))}
        getNoteById={() => ActionMock(getNoteByIdAction.request({id: 1}))}
        createNote={() => ActionMock(createNoteAction.request(noteEntityDto1))}
        updateNoteById={() => ActionMock(updateNoteByIdAction.request(noteEntityDto1))}
        deleteNoteById={() => ActionMock(deleteNoteByIdAction.request({id: 1}))}
        setUpdatedNoteEmpty={() => ActionMock(setUpdatedNoteEmptyAction())}
      />,
    ),
  );
