import React from 'react';
import { useSelector } from 'react-redux';

import { userDataSelector } from '../../stores/user/selectors';

import UserHeader from '@/components/7rewards/UserHeader';

import './Admin.scss';

const Admin = props => {
  let userData = useSelector(state => userDataSelector(state));

  return (
    <div className="UserAdmin">
      <UserHeader account={userData} />
      <div className="UserAdmin__main">{props.children}</div>
    </div>
  );
};

export default Admin;
