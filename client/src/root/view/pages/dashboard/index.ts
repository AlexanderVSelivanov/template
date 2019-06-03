import {connect} from 'react-redux';
import StateType from 'types/StateType';
import {notificationsSelector} from 'root/selectors';
import {usersSelector} from 'modules/user/selectors';
import {notesSelector} from 'modules/notebook/selectors';
import {getUsersAction} from 'modules/user/actions';
import {getNotesAction} from 'modules/notebook/actions';
import page from './page';

const mapStateToProps = (state: StateType) => ({
  notifications: notificationsSelector(state),
  users: usersSelector(state),
  notes: notesSelector(state),
});

const mapDispatchToProps = {
  getUsers: getUsersAction.request,
  getNotes: getNotesAction.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(page);
