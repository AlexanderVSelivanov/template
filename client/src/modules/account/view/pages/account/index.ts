import {connect} from 'react-redux';
import StateType from 'types/StateType';
import {currentAccountSelector} from '../../../selectors';
import page from './page';

const mapStateToProps = (state: StateType) => ({
  account: currentAccountSelector(state),
});

export default connect(mapStateToProps)(page);
