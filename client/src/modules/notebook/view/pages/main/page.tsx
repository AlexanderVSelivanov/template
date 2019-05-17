import React, {useEffect} from 'react';
import {WithStyles} from '@material-ui/core';

import {LoadProperty} from 'types/LoadProperty';
import {EntityList, NoteEntityDto} from 'template-common';
import {
  createNoteAction,
  deleteNoteByIdAction,
  getNoteByIdAction,
  getNotesAction,
  updateNoteByIdAction,
} from 'modules/notebook/actions';

import styles from './styles';

type PageProps = WithStyles<typeof styles> & {
  notes: LoadProperty<EntityList<NoteEntityDto>>,
  editNote: LoadProperty<NoteEntityDto>,
  createdNote: LoadProperty<NoteEntityDto>,
  deletedNote: LoadProperty<NoteEntityDto>,

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
     createdNote,
     deletedNote,
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
