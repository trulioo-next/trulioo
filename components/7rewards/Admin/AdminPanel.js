import React, { Fragment } from 'react';
import classNames from 'classnames';

const AdminPanel = ({ label, className, children, ...props }) => (
  <Fragment>
    <span className="d-block px-4 px-md-0 mb-3">{label ? label : '\xA0'}</span>
    <div className={classNames('UserAdmin__panel', className)} {...props}>
      {children}
    </div>
  </Fragment>
);

export default AdminPanel;
