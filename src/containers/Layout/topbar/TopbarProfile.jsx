import React, {PureComponent} from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import {Collapse} from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import {connect} from 'react-redux';
import PersonIcon from 'mdi-react/PersonIcon';
import {bindActionCreators} from 'redux';
import Auth from '../../../services/AuthStore';
import {userLogout} from '../../../redux/actions/auth';
class TopbarProfile extends PureComponent {
  constructor () {
    super ();
    this.state = {
      collapse: false,
    };
  }

  toggle = () => {
    this.setState (prevState => ({collapse: !prevState.collapse}));
  };
  logOutUser = () => {
    Auth.removeToken ();
    this.props.userLogout ();
  };

  render () {
    const {collapse} = this.state;

    return (
      <div className="topbar__profile">
        <button type="button" className="topbar__avatar" onClick={this.toggle}>
          <PersonIcon />
          <p className="topbar__avatar-name">
            {this.props.user && this.props.user.firstName}
          </p>
          <DownIcon className="topbar__icon" />
        </button>
        {collapse &&
          <button
            type="button"
            className="topbar__back"
            onClick={this.toggle}
          />}
        <Collapse isOpen={collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <div>
              <button
                className="btn btn-secondary px-5 ml-4"
                onClick={this.logOutUser}
              >
                Log Out
              </button>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      userLogout,
    },
    dispatch
  );

export default connect (mapStateToProps, mapDispatchToProps) (TopbarProfile);
