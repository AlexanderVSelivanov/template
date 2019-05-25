import React, {useEffect} from 'react';
import {WithStyles} from '@material-ui/core';

import {EntityList, NoteEntityDto, EmptyOr, AsyncProperty, EditAsyncProperty} from 'template-common';
import {
  createNoteAction,
  deleteNoteByIdAction,
  getNoteByIdAction,
  getNotesAction,
  updateNoteByIdAction,
} from 'modules/notebook/actions';

import styles from './styles';

type PageProps = WithStyles<typeof styles> & {
  notes: EmptyOr<AsyncProperty<EntityList<NoteEntityDto>>>,
  editNote: EmptyOr<EditAsyncProperty<NoteEntityDto>>,

  getNotes: typeof getNotesAction.request,
  getNoteById: typeof getNoteByIdAction.request,
  createNote: typeof createNoteAction.request,
  updateNoteById: typeof updateNoteByIdAction.request,
  deleteNoteById: typeof deleteNoteByIdAction.request,
};

const Page: React.FC<PageProps> =
  ({
     classes,
     notes,
     editNote,
     getNotes,
     getNoteById,
     createNote,
     updateNoteById,
     deleteNoteById,
   }) => {
    useEffect(() => {
      getNotes({skip: 0, take: 25});
    }, []);
    return (
      <>
        List of notes and rich text editor
      </>
    );
  };

export default Page;
