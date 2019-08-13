import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function (ComposedComponent) {
  class Admin extends Component {
    componentWillMount () {
      if (!this.props.isAuth) return this.props.history.push ('/');
      if (!this.props.user.isAdmin)
        return this.props.history.push ('/dashboard');
    }
    componentWillUpdate (nexProps) {
      if (!nexProps.isAuth) return this.props.history.push ('/');
      if (!nexProps.user.isAdmin) return this.props.history.push ('/dashboard');
    }
    render () {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
  });
  return connect (mapStateToProps) (Admin);
}
