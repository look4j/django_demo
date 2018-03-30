import React from 'react';
import styles from './index.css';
import Header from './Header';
import withRouter from 'umi/withRouter';
import '../utils/global'
import pathToRegexp from "path-to-regexp/index";



function Layout({children, location}) {

  return (
    <div className={styles.normal}>
      { pathToRegexp('/sessions/login').exec(location.pathname) ? null : <Header location={location}/> }
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Layout);
