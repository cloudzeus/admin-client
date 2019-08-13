import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Button, ModalFooter} from 'react-bootstrap';
import Modal from '../../../shared/components/Modal';
// import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

class BookingDetails extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    currentBooking: PropTypes.object,
    onHide: PropTypes.func.isRequired,
  };
  static defaultProps = {
    show: false,
    currentBooking: null,
  };
  constructor (props) {
    super (props);
    this.state = {};
  }
  render () {
    const {onHide, show, currentBooking} = this.props;
    return (
      <Modal
        title="Booking Details"
        subTitle={
          <React.Fragment>
            Booking ID:
            <span className="text-danger">
              {currentBooking && currentBooking.BookingNumber}
            </span>
          </React.Fragment>
        }
        show={show}
        onHide={onHide}
      >
        {currentBooking &&
          <React.Fragment>

            <div className="mt-3">
              <h5>PERSONAL DETAILS: </h5>
              <hr className="mt-1 mb-2" />
              <ul>
                <li className="list-unstyled mb-1">
                  First Name : {currentBooking.CustomerFirstName}
                </li>
                <li className="list-unstyled mb-1">
                  Last Name : {currentBooking.CustomerLastName}
                </li>
                <li className="list-unstyled mb-1">
                  Email :
                  {' '}
                  <a href={`mailto:${currentBooking.customeremail}`}>
                    {currentBooking.customeremail}
                  </a>
                </li>
                <li className="list-unstyled mb-1">
                  Phone Number :
                  {' '}
                  <a href={`tel:${currentBooking.CustomerPhoneNumber}`}>
                    {currentBooking.CustomerPhoneNumber}
                  </a>
                </li>
                <li className="list-unstyled mb-1">
                  ID Number : {currentBooking.CustomerIdentityNumber}
                </li>
                <li className="list-unstyled mb-1">
                  Driver's Lic Number : {currentBooking.CustomerLicense}
                </li>
              </ul>
              <h5 className="mt-3">BOOKING DETAILS: </h5>
              <hr className="mt-1 mb-2" />
              <ul>
                <li className="list-unstyled mb-1">
                  <b>Pick Up Location - Date time </b>:
                  {' '}
                  {currentBooking.PlaceFrom}
                  {' '}
                  -
                  {' '}
                  {moment (currentBooking.DateStart).format ('llll')}
                </li>
                <li className="list-unstyled mb-1">
                  <b>Drop Off Location - Date time </b> :
                  {' '}
                  {currentBooking.PlaceTo}
                  {' '}
                  -
                  {' '}
                  {moment (currentBooking.DateEnd).format ('llll')}
                </li>
                <li className="list-unstyled mb-1">
                  <b>Car Category</b> : {currentBooking.CarCategory}
                </li>
                <li className="list-unstyled mb-1">
                  <b>Car Extras</b> : {currentBooking.Notes}
                </li>
              </ul>
              <h5 className="mt-3">TRANSACTION DETAILS: </h5>
              <hr className="mt-1 mb-2" />
              <ul>
                <li className="list-unstyled mb-1">
                  Booking Days : {currentBooking.DaysRental}
                </li>
                <li className="list-unstyled mb-1">
                  Total Cost: {currentBooking.TotalCharge} &euro;
                </li>
                <li className="list-unstyled mb-1">
                  Deposit: {currentBooking.Deposit} &euro;
                </li>
                <li className="list-unstyled mb-1">
                  Balance: {currentBooking.Balance} &euro;
                </li>
                <li className="list-unstyled mb-1">
                  Transaction Code: {currentBooking.payment.id} &euro;
                </li>

              </ul>
            </div>
            <ModalFooter>
              <Button className="mb-0" onClick={onHide}>Close</Button>
            </ModalFooter>
          </React.Fragment>}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentBooking: state.overview.currentBooking,
});

//   const mapDispatchToProps = dispatch => bindActionCreators({
//     getTodayPickups
//   },dispatch)

export default connect (mapStateToProps, null) (BookingDetails);
