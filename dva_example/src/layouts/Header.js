import {Menu, Icon} from 'antd'
import Link from 'umi/link'
import Session from './Session'

function Header({session, dispatch, location}) {

  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/">
        <Link to="/"><Icon type="home"/>Home</Link>
      </Menu.Item>
      <Menu.Item key="/articles">
        <Link to="/articles"><Icon type="bars"/>Articles</Link>
      </Menu.Item>
      <Menu.Item key="/login">
        <Session>Login</Session>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know"><Icon type="frown-circle"/>404</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header
