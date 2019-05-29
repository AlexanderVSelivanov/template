import React, {useEffect, useState} from 'react';
import {Button, Fab, List, ListItem, ListItemText, TextField} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {EntityList, NoteEntityDto, EmptyOr, AsyncProperty, EditAsyncProperty} from 'template-common';
import {
  createNoteAction,
  deleteNoteByIdAction,
  getNoteByIdAction,
  getNotesAction,
  updateNoteByIdAction,
} from 'modules/notebook/actions';
import DialogLayout from 'root/view/layouts/dialog';
import useStyles from './styles';

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
    const [editNoteTitle, setEditNoteTitle] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    useEffect(() => {
      getNotes({skip: 0, take: 25});
    }, []);
    return (
      <div className={classes.container}>
        <div className={classes.editor}>
          <TextField
            label="Note 1"
            value={noteText}
            onChange={event => setNoteText(event.target.value)}
            inputProps={{
              className: classes.textField,
            }}
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
        <Fab className={classes.addButton} color="primary" onClick={() => setShowDialog(true)}>
          <AddIcon/>
        </Fab>
        <DialogLayout

          fullWidth

          open={showDialog}
          title="Create new note"
          actions={
            <>
              <Button color="primary">Create</Button>
              <Button color="secondary" onClick={() => setShowDialog(false)}>Cancel</Button>
            </>
          }
        >
          <TextField
            label="Title"
            value={editNoteTitle}
            onChange={event => setEditNoteTitle(event.target.value)}
            fullWidth
          />
        </DialogLayout>
      </div>
    );
  };

export default Page;
