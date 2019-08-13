import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

import {bindActionCreators} from 'redux';
import Auth from '../../../services/AuthStore';
import {userLogout} from '../../../redux/actions/auth';
import {connect} from 'react-redux';

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const {onClick} = this.props;
    onClick ();
  };
  logOutUser = () => {
    Auth.removeToken ();
    this.props.userLogout ();
  };

  render () {
    const {changeToDark, changeToLight} = this.props;
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink
            title="Bookings"
            icon=""
            route="/dashboard"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="Customers"
            icon=""
            route="/customers"
            onClick={this.hideSidebar}
          />
        </ul>
        <ul className="sidebar__block">
          <SidebarLink title="Log Out" route="" onClick={this.logOutUser} />
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      userLogout,
    },
    dispatch
  );

export default connect (mapDispatchToProps) (SidebarContent);
