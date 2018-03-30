import {connect} from 'dva'
import Link from 'umi/link'
import {Menu, Dropdown, Icon} from 'antd'

const Session = ({user, loading, dispatch}) => {

  function handleLogout() {
    dispatch({type: 'sessions/logout'})
  }

  const menu = (
    <Menu theme='dark'>
      <Menu.Item><a onClick={handleLogout}>Logout</a></Menu.Item>
    </Menu>
  );

  return user != null ? <Dropdown placement="bottomCenter" overlay={menu}><span>{user.username}<Icon type="down" /></span></Dropdown> : <Link to="/sessions/login">Login</Link>

  // user != null ? <a onClick={onLogout}>{user.username}</a> : <Link to="/sessions/login">Login</Link>
}

function mapStateToProps(state) {
  const {user} = state.sessions;
  return {
    user,
    loading: state.loading.models.sessions
  };
}

export default connect(mapStateToProps)(Session)
