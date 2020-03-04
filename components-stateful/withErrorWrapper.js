import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';

const withError = Component => {

  class ErrorComponent extends React.Component {

    static async getInitialProps(ctx) {
      const props = await Component.getInitialProps(ctx);
      const { statusCode } = ctx.res || {};
      return { statusCode, ...props };
    }

    render() {
      const { statusCode } = this.props;
      if (statusCode && statusCode !== 200) return <ErrorPage statusCode={statusCode} />;
      return <Component {...this.props} />
    }
  }

  ErrorComponent.propTypes = {
    statusCode: PropTypes.number,
  };

  ErrorComponent.defaultProps = {
    statusCode: null,
  };

  return ErrorComponent;

};

export default withError;
