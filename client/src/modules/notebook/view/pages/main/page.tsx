import React, {useEffect, useState} from 'react';

import {EntityList, NoteEntityDto, EmptyOr, AsyncProperty, EditAsyncProperty} from 'template-common';
import {
  createNoteAction,
  deleteNoteByIdAction,
  getNoteByIdAction,
  getNotesAction,
  updateNoteByIdAction,
} from 'modules/notebook/actions';

import useStyles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';

type PageProps = {
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
     notes,
     editNote,
     getNotes,
     getNoteById,
     createNote,
     updateNoteById,
     deleteNoteById,
   }) => {
    const classes = useStyles();
    const [noteText, setNoteText] = useState('');
    // useEffect(() => {
    //   getNotes({skip: 0, take: 25});
    // }, []);
    return (
      <div className={classes.container}>
        <div className={classes.editor}>
          <TextField
            label="Note 1"
            value={noteText}
            onChange={event => setNoteText(event.target.value)}
            variant="outlined"
            fullWidth
            multiline
          />
        </div>
        <div className={classes.noteList}>
          <List>
            <ListItem button>
              <ListItemText primary="Note 1"/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Note 1"/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Note 1"/>
            </ListItem>
          </List>
        </div>
      </div>
    );
  };

export default Page;
