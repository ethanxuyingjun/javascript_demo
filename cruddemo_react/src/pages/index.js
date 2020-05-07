import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import AddressBookList from '../components/AddressBookList'

function IndexPage() {
  return (
    <div className={styles.normal}>
      <AddressBookList />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
