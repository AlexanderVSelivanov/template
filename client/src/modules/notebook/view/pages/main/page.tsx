import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Fab, Grid, List, ListItem, ListItemText, TextField, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  EntityList,
  NoteEntityDto,
  Empty,
  EmptyOr,
  AsyncProperty,
  isEmpty,
  isRequestProperty,
  isSuccessProperty,
  isFailureProperty,
} from 'template-common';
import {
  createNoteAction,
  deleteNoteByIdAction,
  getNoteByIdAction,
  getNotesAction,
  updateNoteByIdAction,
} from 'modules/notebook/actions';
import useStyles from './styles';
import InProgress from '../../../../../root/view/components/InProgress';

type PageProps = {
  notes: EmptyOr<AsyncProperty<EntityList<NoteEntityDto>>>,
  note: EmptyOr<AsyncProperty<NoteEntityDto>>,
  createdNote: EmptyOr<AsyncProperty<NoteEntityDto>>,
  updatedNote: EmptyOr<AsyncProperty<NoteEntityDto>>,
  deletedNote: EmptyOr<AsyncProperty<NoteEntityDto>>,

  getNotes: typeof getNotesAction.request,
  getNoteById: typeof getNoteByIdAction.request,
  createNote: typeof createNoteAction.request,
  updateNoteById: typeof updateNoteByIdAction.request,
  deleteNoteById: typeof deleteNoteByIdAction.request,
};

const Page: React.FC<PageProps> =
  ({
     notes,
     note,
     createdNote,
     updatedNote,
     deletedNote,
     getNotes,
     getNoteById,
     createNote,
     updateNoteById,
     deleteNoteById,
   }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [countNotes, setCountNotes] = useState(25);
    const [selectedNote, setSelectedNote] = useState<EmptyOr<NoteEntityDto>>(Empty);

    const reloadNotes = useCallback(() => {
      getNotes({skip: page, take: countNotes});
    }, [page, countNotes]);

    useEffect(() => {
      reloadNotes();
    }, []);
    useEffect(() => {
      if (isEmpty(selectedNote) && !isEmpty(notes) && isSuccessProperty(notes) && notes.value.items.length > 0) {
        setSelectedNote(notes.value.items[0]);
      }
    }, [notes]);
    useEffect(() => {
      if (!isEmpty(selectedNote) && !isEmpty(note) && isSuccessProperty(note)) {
        setSelectedNote(note.value);
      }
    }, [note]);
    useEffect(() => {
      if (!isEmpty(createdNote) && isSuccessProperty(createdNote)) {
        reloadNotes();
      }
    }, [createdNote]);
    useEffect(() => {
      if (!isEmpty(deletedNote) && isSuccessProperty(deletedNote)) {
        reloadNotes();
      }
    }, [deletedNote]);

    const handleCreateNote = () => {
      createNote({title: 'New Note'});
    };
    const handleNoteClick = (selectedNote: NoteEntityDto) => {
      getNoteById({id: selectedNote.id});
    };

    const updateSelectedNote = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      property: 'title' | 'text' | 'tags',
    ) => {
      const value = event.target.value;
      console.log(value);
      console.log(selectedNote);
      //
      // if (!isEmpty(selectedNote)) {
      //   updateNoteById({...selectedNote, text: noteText});
      // }
    };

    const disableSelectNote = useMemo(() => {
      return Boolean(isEmpty(selectedNote) || (!isEmpty(note) && isRequestProperty(note)));
    }, [selectedNote, note]);

    return (
      <div className={classes.container}>
        {
          isEmpty(selectedNote)
          && <Typography className={classes.note}>Select or create note</Typography>
        }
        {
          !isEmpty(selectedNote) && (
            <Grid container className={classes.note} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  value={selectedNote.title}
                  onChange={event => updateSelectedNote(event, 'title')}
                  disabled={disableSelectNote}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} className={classes.editor}>
                <TextField
                  value={selectedNote.text || ''}
                  onChange={event => updateSelectedNote(event, 'text')}
                  disabled={disableSelectNote}
                  inputProps={{
                    className: classes.textField,
                  }}
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tags"
                  value={selectedNote.tags || ''}
                  onChange={event => updateSelectedNote(event, 'tags')}
                  disabled={disableSelectNote}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <Typography>Created: {new Date(selectedNote.created).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>Updated: {new Date(selectedNote.updated).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={4}>
                {
                  !isEmpty(note) && isRequestProperty(note)
                  && <div className={classes.note}><InProgress text="Loading note..."/></div>
                }
                {!isEmpty(updatedNote) && isRequestProperty(updatedNote) && <Typography>Saving...</Typography>}
                {!isEmpty(updatedNote) && isSuccessProperty(updatedNote) && <Typography>Saved</Typography>}
                {
                  !isEmpty(updatedNote) && isFailureProperty(updatedNote)
                  && <Typography>Error saving: {updatedNote.error.message}</Typography>
                }
              </Grid>
            </Grid>
          )
        }

        <div className={classes.noteList}>
          {
            !isEmpty(notes) && isRequestProperty(notes) && <InProgress text="Notes loading..."/>
          }
          <List>
            {
              !isEmpty(notes) && isSuccessProperty(notes) && notes.value.items.map(noteItem => (
                  <ListItem
                    key={noteItem.id}
                    onClick={() => handleNoteClick(noteItem)}
                    selected={Boolean(selectedNote && selectedNote.id === noteItem.id)}
                    button
                  >
                    <ListItemText primary={noteItem.title} secondary={noteItem.tags}/>
                  </ListItem>
                ),
              )
            }
          </List>
        </div>

        <Fab className={classes.addButton} color="primary" onClick={handleCreateNote}>
          <AddIcon/>
        </Fab>

        {/*<DialogLayout*/}
        {/*  fullWidth*/}
        {/*  open={showDialog}*/}
        {/*  title="Create new note"*/}
        {/*  actions={*/}
        {/*    <>*/}
        {/*      <Button color="primary" onClick={handleCreateNote}>Create</Button>*/}
        {/*      <Button color="secondary" onClick={() => setShowDialog(false)}>Cancel</Button>*/}
        {/*    </>*/}
        {/*  }*/}
        {/*>*/}
        {/*  <TextField*/}
        {/*    label="Title"*/}
        {/*    value={editNoteTitle}*/}
        {/*    onChange={event => setEditNoteTitle(event.target.value)}*/}
        {/*    fullWidth*/}
        {/*  />*/}
        {/*</DialogLayout>*/}

      </div>
    );
  };

export default Page;
