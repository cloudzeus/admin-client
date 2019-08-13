import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import LogInForm from './components/LogInForm';
import AuthService from '../../services/auth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {userLogin} from '../../redux/actions/auth';
// import { SubmissionError } from 'redux-form'

const auth = new AuthService ();

class LogIn extends Component {
  constructor (props) {
    super (props);
    this.state = {
      loading: false,
      loginFailed: false,
    };
  }

  submit = values => {
    //start loading and remove the erro message
    this.setState ({loading: true, loginFailed: false});
    const {history, userLogin} = this.props;
    //if no input
    if (values.email.length === 0 || values.email.length === 0)
      return this.setState ({
        loading: false,
        loginFailed: true,
      });

    //Hitting the server to login user
    auth
      .login (values)
      .then (res => {
        console.log ('res', res);
        if (res.is_error)
          return this.setState ({loading: false, loginFailed: true});
        userLogin (res.content);
        history.push ('/dashboard');
      })
      .catch (e => {
        console.log (e);
        return this.setState ({loading: false, loginFailed: true});
      });
  };
  setLoader = (e, handleSubmit) => {
    e.preventDefault ();
    this.setState ({loading: true});
    handleSubmit (e);
  };

  render = () => {
    const {loginFailed, loading} = this.state;
    return (
      <div className="account">
        <div className="account__wrapper">
          <div className="account__card">
            <div
              className="account__head"
              style={{borderLeft: '#A5CE44 solid 5px'}}
            >
              <h3 className="account__title">
                Breezerentals
              </h3>
              <h4 className="account__subhead subhead">
                Better Value, Better Cars
              </h4>
            </div>
            {loginFailed
              ? <p className="text-danger mb-3 text-center">
                  incorrect email or password!{' '}
                </p>
              : null}
            <LogInForm
              setLoader={this.setLoader}
              loading={loading}
              onSubmit={this.submit}
            />
            <div className="account__or">
              <p>Or Easily Using</p>
            </div>
            <div className="account__social">
              <Link
                className="account__social-btn account__social-btn--facebook"
                to="/pages/one"
              >
                <FacebookIcon />
              </Link>
              <Link
                className="account__social-btn account__social-btn--google"
                to="/pages/one"
              >
                <GooglePlusIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      userLogin,
    },
    dispatch
  );

export default connect (null, mapDispatchToProps) (LogIn);

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
