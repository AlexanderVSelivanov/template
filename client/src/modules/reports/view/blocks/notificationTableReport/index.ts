import block from './block';
import StateType from 'types/StateType';
import {notificationsSelector} from 'root/selectors';
import {connect} from 'react-redux';

const mapStateToProps = (state: StateType) => ({
  notifications: notificationsSelector(state),
});

export default connect(mapStateToProps)(block);
