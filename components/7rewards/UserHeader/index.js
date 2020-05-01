import React, { Fragment } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import moment from 'moment';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './UserHeader.scss';

const ActiveLink = ({ children, href }) => {
  const router = useRouter();

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={classNames('UserHeader__navLink', {
        '-active': router.pathname === href,
      })}
    >
      {children}
    </a>
  );
};

const UserHeader = ({ account, className }) => {
  return (
    <header className={classNames('UserHeader', className)}>
      <Container className="px-4">
        <Row className="align-items-end justify-content-between">
          {account && (
            <Fragment>
              <Col xs="12">
                <h1 className="h2 mb-md-0 text-center text-md-left">
                  {account.user.first_name} {account.user.last_name}
                </h1>
              </Col>
              <Col xs="12" md="auto" className="order-md-last">
                <div className="UserHeader__meta text-center text-md-right">
                  <span className="d-block">
                    Member since{' '}
                    {moment(account.user.enroll_date).format('MMMM YYYY')}
                  </span>
                  <span className="d-block">
                    Member ID: {account.user.loyalty_id}
                  </span>
                </div>
              </Col>
            </Fragment>
          )}
          <Col xs="12" md="auto">
            <nav className="UserHeader__nav px-4">
              <Row as="ul" className="UserHeader__navList list-unstyled">
                <Col as="li" xs="6" md="auto" className="UserHeader__navItem">
                  <ActiveLink href="/7rewards">My 7Rewards</ActiveLink>
                </Col>
                <Col as="li" xs="6" md="auto">
                  <ActiveLink href="/7rewards/myaccount">Account</ActiveLink>
                </Col>
              </Row>
            </nav>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default UserHeader;
