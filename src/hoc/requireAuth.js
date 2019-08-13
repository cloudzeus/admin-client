import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount () {
      if (!this.props.isAuth) return this.props.history.push ('/log_in');
    }
    componentWillUpdate (nextProps) {
      if (!nextProps.isAuth) return this.props.history.push ('/log_in');
    }
    render () {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
  });
  return connect (mapStateToProps) (Authentication);
}
