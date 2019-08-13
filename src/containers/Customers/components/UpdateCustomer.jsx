import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import CustomerService from '../../../services/Customers';
import {bindActionCreators} from 'redux';
import {setCurrentCustomer} from '../../../redux/actions/customers';

import PropTypes from 'prop-types';

class BookingDetails extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    currentCustomer: PropTypes.object,
    onHide: PropTypes.func.isRequired,
  };
  static defaultProps = {
    show: false,
    currentCustomer: null,
  };
  constructor (props) {
    super (props);
    this.state = {
      loading: false,
      loaded: false,
      updated: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault ();
    const {setCurrentCustomer} = this.props;
    this.setState ({loading: true, updated: false});
    let payload = this.state;
    delete payload.loaded;
    delete payload.loading;
    delete payload.updated;
    CustomerService.update (payload).then (res => {
      console.log (res);
      if (res.is_error) return this.setState ({loading: false});
      setCurrentCustomer (res);
      this.setState ({loading: false, updated: true});
      setTimeout (() => {
        this.setState ({updated: false});
      }, 2000);
    });
  };
  handleChange = e => {
    this.setState ({[e.target.name]: e.target.value});
  };
  render () {
    const {onHide, show, currentCustomer} = this.props;

    const {
      loading,
      loaded,
      CustomerAddress,
      CustomerCity,
      CustomerFirstName,
      CustomerIdentityNumber,
      CustomerLastName,
      CustomerLicense,
      CustomerPhoneNumber,
      CustomerZipCode,
      customeremail,
    } = this.state;
    if (currentCustomer && !loaded)
      this.setState ({...currentCustomer, loaded: true});
    return currentCustomer
      ? <Modal
          title="CUSTOMER DETAILS"
          subTitle="YOU CAN EDIT AND SAVE CHANGES"
          show={show}
          onHide={() => {
            this.setState ({loaded: false});
            onHide ();
          }}
        >
          {currentCustomer &&
            <form className="form mt-4" onSubmit={this.handleSubmit}>
              {this.state.updated &&
                <p className="text-center text-success">details updated.</p>}
              <div className="form-row" style={{width: '100%'}}>
                <div className="form__form-group col-md-4">
                  <span className="form__form-group-label">First Name</span>
                  <div className="form__form-group-input">
                    <input
                      name="CustomerFirstName"
                      value={CustomerFirstName}
                      onChange={this.handleChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="form__form-group col-md-4">
                  <span className="form__form-group-label">Last Name</span>
                  <div className="form__form-group-input">
                    <input
                      value={CustomerLastName}
                      onChange={this.handleChange}
                      name="CustomerLastName"
                      type="text"
                    />
                  </div>
                </div>
                <div className="form__form-group col-md-4">
                  <span className="form__form-group-label">Email Address</span>
                  <div className="form__form-group-input">
                    <input
                      value={customeremail}
                      onChange={this.handleChange}
                      name="customeremail"
                      type="email"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row" style={{width: '100%'}}>
                <div className="form__form-group col-md-3">
                  <span className="form__form-group-label">Phone Number</span>
                  <div className="form__form-group-input">
                    <input
                      value={CustomerPhoneNumber}
                      onChange={this.handleChange}
                      name="CustomerPhoneNumber"
                      type="text"
                    />
                  </div>
                </div>
                <div className="form__form-group col-md-6">
                  <span className="form__form-group-label">
                    Physical Address
                  </span>
                  <div className="form__form-group-input">
                    <input
                      value={CustomerAddress}
                      onChange={this.handleChange}
                      name="CustomerAddress"
                      type="text"
                    />
                  </div>
                </div>
                <div className="form__form-group col-md-3">
                  <span className="form__form-group-label">City</span>
                  <div className="form__form-group-input">
                    <input
                      value={CustomerCity}
                      onChange={this.handleChange}
                      name="CustomerCity"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row" style={{width: '100%'}}>
                <div className="form__form-group col-md-2">
                  <span className="form__form-group-label">Zip Code</span>
                  <div className="form__form-group-input">
                    <input
                      value={CustomerZipCode}
                      onChange={this.handleChange}
                      name="CustomerZipCode"
                      type="text"
                    />
                  </div>
                </div>
                <div className="form__form-group col-md-4">
                  <span className="form__form-group-label">
                    Physical Address
                  </span>
                  <div className="form__form-group-input">
                    <input
                      value={CustomerAddress}
                      onChange={this.handleChange}
                      name="CustomerAddress"
                      type="text"
                    />
                  </div>
                </div>
                <div className="form__form-group col-md-4">
                  <span className="form__form-group-label">
                    Identity Number
                  </span>
                  <div className="form__form-group-input">
                    <input
                      value={CustomerIdentityNumber}
                      onChange={this.handleChange}
                      name="CustomerIdentityNumber"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row" style={{width: '100%'}}>
                <div className="form__form-group col-md-4">
                  <span className="form__form-group-label">
                    Driver's License
                  </span>
                  <div className="form__form-group-input">
                    <input
                      value={CustomerLicense}
                      onChange={this.handleChange}
                      name="CustomerLicense"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              {loading
                ? <div className="mx-auto">
                    <svg className="load__icon">
                      <path
                        fill="#4ce1b6"
                        d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                      />
                    </svg>
                  </div>
                : <React.Fragment>
                    <button
                      type="submit"
                      className="btn btn-primary account__btn account__btn--small"
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary account__btn account__btn--small"
                      onClick={() => {
                        this.setState ({loaded: false});
                        onHide ();
                      }}
                    >
                      Close
                    </button>
                  </React.Fragment>}
            </form>}
        </Modal>
      : '';
  }
}

const mapStateToProps = state => ({
  currentCustomer: state.customers.currentCustomer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      setCurrentCustomer,
    },
    dispatch
  );

export default connect (mapStateToProps, mapDispatchToProps) (BookingDetails);
