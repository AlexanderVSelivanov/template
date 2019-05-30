import {connect} from 'react-redux';

import StateType from 'types/StateType';
import {
  getNotesAction,
  getNoteByIdAction,
  createNoteAction,
  updateNoteByIdAction,
  deleteNoteByIdAction,
} from 'modules/notebook/actions';
import {
  createdNoteSelector,
  deletedNoteSelector,
  noteSelector,
  notesSelector,
  updatedNoteSelector,
} from 'modules/notebook/selectors';

import page from './page';

const mapStateToProps = (state: StateType) => ({
  notes: notesSelector(state),
  note: noteSelector(state),
  createdNote: createdNoteSelector(state),
  updatedNote: updatedNoteSelector(state),
  deletedNote: deletedNoteSelector(state),
});

const dispatchProps = {
  getNotes: getNotesAction.request,
  getNoteById: getNoteByIdAction.request,
  createNote: createNoteAction.request,
  updateNoteById: updateNoteByIdAction.request,
  deleteNoteById: deleteNoteByIdAction.request,
};

const container = connect(mapStateToProps, dispatchProps)(page);

export default container;
