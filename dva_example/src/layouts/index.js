import React from 'react';
import styles from './index.css';
import Header from './Header';
import withRouter from 'umi/withRouter';
import {Breadcrumb} from 'antd'
import '../utils/global'

function Layout({children, location}) {

  return (
    <div className={styles.normal}>
      <Header location={location}/>
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Layout);
