import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';

import StateType from 'types/StateType';
import {
  getNotesAction,
  getNoteByIdAction,
  createNoteAction,
  updateNoteByIdAction,
  deleteNoteByIdAction,
} from 'modules/notebook/actions';
import {notesSelector, editNoteSelector} from 'modules/notebook/selectors';

import styles from './styles';
import page from './page';

const mapStateToProps = (state: StateType) => ({
  notebook: notesSelector(state),
  editNote: editNoteSelector(state),
});

const dispatchProps = {
  getNotes: getNotesAction.request,
  getNoteById: getNoteByIdAction.request,
  createNote: createNoteAction.request,
  updateNoteById: updateNoteByIdAction.request,
  deleteNoteById: deleteNoteByIdAction.request,
};

const connectedPage = connect(mapStateToProps, dispatchProps)(page);
const withStylePage = withStyles(styles)(connectedPage);

export default withStylePage;
