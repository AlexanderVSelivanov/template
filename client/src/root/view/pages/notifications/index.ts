import {connect} from 'react-redux';
import StateType from 'types/StateType';
import {notificationsSelector, newNotificationsFromSelector} from '../../../selectors';
import {setNewNotificationsFromAction} from '../../../actions';
import page from './page';

const mapStateToProps = (state: StateType) => ({
  notifications: notificationsSelector(state),
  newNotificationsFrom: newNotificationsFromSelector(state),
});

const mapDispatchToProps = {
  setNewNotificationsFrom: setNewNotificationsFromAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(page);
