import React, {Component} from 'react';
// import {  } from '../../redux/actions/customers'
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import CustomerCard from './components/CustomerCard';
import moment from 'moment';
import BookingDetails from '../Dashboard/components/BookingDetails';
import {
  setCurrentBooking,
  setNullCurrentBooking,
} from '../../redux/actions/overview';
import {setCurrentCustomer} from '../../redux/actions/customers';
import {bindActionCreators} from 'redux';
import EmailCustomer from './components/EmailCustomer';
import CustomerService from '../../services/Customers';

class CustomerDetails extends Component {
  constructor (props) {
    super (props);
    this.state = {
      showBooking: false,
    };
  }
  componentDidMount () {
    this.fetchCustomer ();
  }
  handleShowBooking = (show, booking) => {
    if (show) {
      const {setCurrentBooking} = this.props;
      setCurrentBooking (booking);
      return this.setState ({showBooking: true, showEmailModal: false});
    }
  };
  fetchCustomer = () => {
    const {id} = this.props.match.params;
    const {setCurrentCustomer} = this.props;
    CustomerService.fetch (id)
      .then (res => {
        console.log ('res', res);
        if (res.is_error) return console.log (res.error_content);
        const customer = res.content;
        let stats = this.computeStats (customer);
        console.log ('stats', stats);
        customer.stats = stats;
        setCurrentCustomer (customer);
      })
      .catch (err => {
        console.log (err);
      });
  };
  computeStats = currentCustomer => {
    if (
      !(currentCustomer.reservations && currentCustomer.reservations.length > 0)
    )
      return {revenue: 0.00, debit: 0.00, deposits: 0.00, balance: 0.00};
    let stats = currentCustomer.reservations.reduce (
      (accumulator, reservation) => {
        accumulator.revenue += reservation.TotalCharge;
        accumulator.deposits += reservation.Deposit;
        accumulator.balance += reservation.TotalCharge - reservation.Deposit;
        console.log ('accumulator', accumulator);
        return accumulator;
      },
      {revenue: 0.00, deposits: 0.00, balance: 0.00}
    );
    return stats;
  };
  render () {
    const {currentCustomer} = this.props;
    return (
      <Container>
        <CustomerCard
          title={
            <React.Fragment>
              Customer Details
              <button
                onClick={() => this.setState ({showEmailModal: true})}
                className="btn rounded ml-1  btn-success mb-0 btn-sm float-right"
              >
                email
              </button>
            </React.Fragment>
          }
          subTitle={
            currentCustomer
              ? `${currentCustomer.CustomerFirstName} ${currentCustomer.CustomerLastName}`
              : ''
          }
        >
          {currentCustomer &&
            <React.Fragment>
              <div className="mt-3">
                <h5>PERSONAL DETAILS: </h5>
                <hr className="mt-1 mb-2" />
                <ul>
                  <li className="list-unstyled mb-1">
                    First Name : {currentCustomer.CustomerFirstName}
                  </li>
                  <li className="list-unstyled mb-1">
                    Last Name : {currentCustomer.CustomerLastName}
                  </li>
                  <li className="list-unstyled mb-1">
                    Email :
                    {' '}
                    <a href={`mailto:${currentCustomer.customeremail}`}>
                      {currentCustomer.customeremail}
                    </a>
                  </li>
                  <li className="list-unstyled mb-1">
                    Phone Number :
                    {' '}
                    <a href={`tel:${currentCustomer.CustomerPhoneNumber}`}>
                      {currentCustomer.CustomerPhoneNumber}
                    </a>
                  </li>
                  <li className="list-unstyled mb-1">
                    ID Number : {currentCustomer.CustomerIdentityNumber}
                  </li>
                  <li className="list-unstyled mb-1">
                    Driver's Lic Number : {currentCustomer.CustomerLicense}
                  </li>
                </ul>

                {currentCustomer.stats &&
                  <React.Fragment>
                    <h5 className="mt-3">TRANSACTION DETAILS: </h5>
                    <hr className="mt-1 mb-2" />
                    <ul>
                      <li className="list-unstyled mb-1">
                        Revenue :
                        {' '}
                        <span className="text-info">
                          {' '}{currentCustomer.stats.revenue} &euro;
                        </span>
                      </li>
                      <li className="list-unstyled mb-1">
                        Deposits:
                        {' '}
                        <span className="text-success">
                          {' '}{currentCustomer.stats.deposits} &euro;
                        </span>
                      </li>
                      <li className="list-unstyled mb-1">
                        Balance:
                        {' '}
                        <span className="text-danger">
                          {currentCustomer.stats.balance} &euro;
                        </span>
                      </li>
                    </ul>
                  </React.Fragment>}

              </div>
              <h5 className="mt-3 mb-2">RESERVATIONS COLLECTION: </h5>
              <div className="table-responsive pb-4">
                {currentCustomer.reservations.length > 0
                  ? <table className="table   hover striped">
                      <thead>
                        <tr>
                          <th>Pickup Location </th>
                          <th>Drop Off Location</th>
                          <th>reservation Ref</th>
                          <th>Car Category</th>
                          <th>Car Make</th>
                          <th>&euro; Total</th>
                          <th>&euro; Deposit</th>
                          <th>&euro; Balance</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentCustomer.reservations.map (
                          (reservation, idx) => (
                            <tr key={reservation._id}>
                              <td>
                                {moment (reservation.DateStart).calendar ()}
                              </td>
                              <td>
                                {moment (reservation.DateEnd).calendar ()}
                              </td>
                              <td>{reservation.BookingNumber}</td>
                              <td>{reservation.CarCategory}</td>
                              <td>{reservation.CarMake}</td>
                              <td className="text-primary">
                                {reservation.TotalCharge}
                              </td>
                              <td className="text-success">
                                {reservation.Deposit}
                              </td>
                              <td className="text-warning">
                                {reservation.Balance}
                              </td>
                              <td>
                                <div className="btn-group rounded mb-1">
                                  <button
                                    onClick={() =>
                                      this.handleShowBooking (
                                        true,
                                        reservation
                                      )}
                                    className="btn rounded btn-primary mb-0 btn-sm"
                                  >
                                    details
                                  </button>

                                </div>
                              </td>
                            </tr>
                          )
                        )}

                      </tbody>
                    </table>
                  : <p className="text-muted ml-2">
                      your reservation history will be shown here
                    </p>}

                <hr />
                <BookingDetails
                  show={this.state.showBooking}
                  onHide={() => {
                    this.setState ({showBooking: false});
                    this.props.setNullCurrentBooking ();
                  }}
                />
                <EmailCustomer
                  show={this.state.showEmailModal}
                  onHide={() => this.setState ({showEmailModal: false})}
                />
              </div>
            </React.Fragment>}
        </CustomerCard>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentCustomer: state.customers.currentCustomer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      setCurrentBooking,
      setNullCurrentBooking,
      setCurrentCustomer,
    },
    dispatch
  );

export default connect (mapStateToProps, mapDispatchToProps) (CustomerDetails);
