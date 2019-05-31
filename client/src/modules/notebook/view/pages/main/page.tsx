import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Fab,
  Grid, IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
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
  getNotesAction, setUpdatedNoteEmptyAction,
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
  setUpdatedNoteEmpty: typeof setUpdatedNoteEmptyAction,
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
     setUpdatedNoteEmpty,
   }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [notesPerPage, setNotesPerPage] = useState(20);
    const [selectedNote, setSelectedNote] = useState<EmptyOr<NoteEntityDto>>(Empty);

    const reloadNotes = useCallback(() => {
      getNotes({skip: page * notesPerPage, take: notesPerPage});
    }, [page, notesPerPage]);

    useEffect(() => {
      reloadNotes();
    }, []);
    useEffect(() => {
      reloadNotes();
    }, [page]);
    useEffect(() => {
      if (isEmpty(selectedNote) && !isEmpty(notes) && isSuccessProperty(notes) && notes.value.items.length > 0) {
        const firstNote = notes.value.items[0];
        getNoteById({id: firstNote.id});
      }
    }, [notes]);
    useEffect(() => {
      if (!isEmpty(note) && isSuccessProperty(note)) {
        setUpdatedNoteEmpty();
        setSelectedNote(note.value);
      }
    }, [note]);
    useEffect(() => {
      if (!isEmpty(createdNote) && isSuccessProperty(createdNote)) {
        reloadNotes();
      }
    }, [createdNote]);
    useEffect(() => {
      if (!isEmpty(selectedNote) && !isEmpty(updatedNote) && isSuccessProperty(updatedNote)) {
        setSelectedNote({
          ...selectedNote,
          updated: updatedNote.value.updated,
        });
      }
    }, [updatedNote]);
    useEffect(() => {
      if (!isEmpty(deletedNote) && isSuccessProperty(deletedNote)) {
        reloadNotes();
      }
    }, [deletedNote]);

    const handleCreateNote = () => {
      createNote({title: 'New Note'});
    };
    const handleNoteClick = (noteItem: NoteEntityDto) => {
      if (isEmpty(selectedNote) || selectedNote.id !== noteItem.id) {
        getNoteById({id: noteItem.id});
      }
    };
    const handleNoteDelete = (noteItem: NoteEntityDto) => {
      if (!isEmpty(selectedNote) && selectedNote.id === noteItem.id) {
        setSelectedNote(Empty);
      }
      deleteNoteById({id: noteItem.id});
    };

    const handleNavigateBefore = () => {
      if (page > 0) {
        setPage(page - 1);
      }
    };
    const handleNavigateNext = () => {
      setPage(page + 1);
    };

    const updateSelectedNote = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      property: 'title' | 'text' | 'tags',
    ) => {
      if (!isEmpty(selectedNote)) {
        const value = event.target.value;
        const newNote: NoteEntityDto = {
          ...selectedNote,
          [property]: value,
        };
        setSelectedNote(newNote);
        updateNoteById(newNote);
      }
    };

    const disableSelectNote = useMemo(() => {
      return Boolean(isEmpty(selectedNote) || (!isEmpty(note) && isRequestProperty(note)));
    }, [selectedNote, note]);

    return (
      <div className={classes.container}>
        {
          isEmpty(notes)
          && <Typography className={classes.note}>There aren't any notes yet.</Typography>
        }
        {
          isEmpty(selectedNote)
          && <Typography className={classes.note}>No selected note.</Typography>
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
              <Grid item xs={2}>
                {!isEmpty(note) && isRequestProperty(note) && <InProgress text="Loading..."/>}
                {!isEmpty(note) && isSuccessProperty(note) && <Typography>Loaded</Typography>}
                {
                  !isEmpty(note) && isFailureProperty(note)
                  && <Typography>Error: {note.error.message}</Typography>
                }
              </Grid>
              <Grid item xs={2}>
                {!isEmpty(updatedNote) && isRequestProperty(updatedNote) && <InProgress text="Saving..."/>}
                {!isEmpty(updatedNote) && isSuccessProperty(updatedNote) && <Typography>Saved</Typography>}
                {
                  !isEmpty(updatedNote) && isFailureProperty(updatedNote)
                  && <Typography>Error: {updatedNote.error.message}</Typography>
                }
              </Grid>
            </Grid>
          )
        }

        <div className={classes.noteList}>
          {
            !isEmpty(notes) && isRequestProperty(notes) && <InProgress text="Notes loading..."/>
          }
          {
            !isEmpty(notes) && isSuccessProperty(notes) && (
              <>
                <div className={classes.pagination}>
                  <IconButton
                    edge="end"
                    aria-label="Before"
                    onClick={handleNavigateBefore}
                    disabled={page === 0}
                  >
                    <NavigateBeforeIcon/>
                  </IconButton>
                  <Typography>
                    {page * notesPerPage + 1}-{page * notesPerPage + notes.value.items.length} of {notes.value.count}
                  </Typography>
                  <IconButton
                    edge="end"
                    aria-label="Next"
                    onClick={handleNavigateNext}
                    disabled={page * notesPerPage + notes.value.items.length >= notes.value.count}
                  >
                    <NavigateNextIcon/>
                  </IconButton>
                </div>
                <List>
                  {
                    notes.value.items.map(noteItem => (
                        <ListItem
                          key={noteItem.id}
                          onClick={() => handleNoteClick(noteItem)}
                          selected={Boolean(selectedNote && selectedNote.id === noteItem.id)}
                          disabled={!isEmpty(note) && isRequestProperty(note)}
                          button
                        >
                          <ListItemText
                            primary={noteItem.title}
                            secondary={noteItem.tags && noteItem.tags.join ? noteItem.tags.join(', ') : noteItem.tags}
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="Delete" onClick={() => handleNoteDelete(noteItem)}>
                              <DeleteIcon/>
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ),
                    )
                  }
                </List>
              </>
            )
          }

        </div>

        <Fab className={classes.addButton} color="primary" onClick={handleCreateNote}>
          <AddIcon/>
        </Fab>

      </div>
    );
  };

export default Page;
