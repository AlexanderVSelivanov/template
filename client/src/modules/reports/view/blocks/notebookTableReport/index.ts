import block from './block';
import StateType from 'types/StateType';
import {notesSelector} from 'modules/notebook/selectors';
import {getNotesAction} from 'modules/notebook/actions';
import {connect} from 'react-redux';

const mapStateToProps = (state: StateType) => ({
  notes: notesSelector(state),
});

const mapDispatchToProps = {
  getNotes: getNotesAction.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(block);
