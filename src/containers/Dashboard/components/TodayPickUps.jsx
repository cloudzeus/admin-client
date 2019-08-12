import React, {Component} from 'react';

import {
  getTodayPickups,
  setCurrentBooking,
  setNullCurrentBooking,
} from '../../../redux/actions/overview';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import DashCard from './DashCard';
import BookingDetails from './BookingDetails';
import EmailCustomer from './EmailCustomer';
import Reservations from '../../../services/Reservation';
import moment from 'moment';
import Pagination from '../../../shared/components/Pagination';
import SearchForm from './SearchForm';

class TodayPickUps extends Component {
  constructor (props) {
    super (props);
    this.state = {
      loaded: false,
      showBooking: false,
      showEmailModal: false,
      searched: false,
      loading: false,
      currentPage: 1,
      bookingsPerPage: 10,
    };
  }
  componentDidMount () {
    this.fetchData ();
    this.setState ({loaded: true});
  }
  static propTypes = {
    todayPickups: PropTypes.shape ({
      date: PropTypes.string.isRequired,
      bookings: PropTypes.arrayOf (
        PropTypes.shape ({
          _id: PropTypes.string.isRequired,
          CustomerFirstName: PropTypes.string.isRequired,
          CustomerLastName: PropTypes.string.isRequired,
          DateStart: PropTypes.string.isRequired,
          DateEnd: PropTypes.string.isRequired,
          payment: PropTypes.object.isRequired,
          BookingNumber: PropTypes.string.isRequired,
          TotalCharge: PropTypes.number.isRequired,
          Deposit: PropTypes.number.isRequired,
          Balance: PropTypes.number.isRequired,
        })
      ),
    }),
  };
  fetchData = () => {
    this.setState ({searched: false});
    Reservations.fetch ()
      .then (res => {
        //console.log('res', res)
        if (res.is_error) return console.log ('error', res.error_content);
        const todaysActivities = res.content.filter (
          reservation =>
            moment (new Date (reservation.DateFrom).toLocaleString ()).format (
              'LL'
            ) == moment (new Date ().toLocaleString ()).format ('LL') ||
            moment (new Date (reservation.DateFrom).toLocaleString ()).format (
              'LL'
            ) == moment (new Date ().toLocaleString ()).format ('LL')
        );
        const todayWork = {
          date: moment (new Date ().toLocaleString ()).format ('LL'), // ! change to today's events const todaysActivities
          bookings: res.content,
        };
        this.props.getTodayPickups (todayWork);
      })
      .catch (err => {
        console.log ('err', err);
      });
  };
  handleShowBooking = (show, booking) => {
    if (show) {
      const {setCurrentBooking} = this.props;
      setCurrentBooking (booking);
      return this.setState ({showBooking: true});
    }
  };
  handleShowEmailModal = (show, booking) => {
    if (show) {
      const {setCurrentBooking} = this.props;
      setCurrentBooking (booking);
      return this.setState ({showEmailModal: true});
    }
  };
  getCurrentBookings = () => {
    const {currentPage, bookingsPerPage} = this.state;
    const {todayPickups} = this.props;
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = todayPickups.bookings.slice (
      indexOfFirstBooking,
      indexOfLastBooking
    );
    return currentBookings;
  };
  changePage = pageNumber => {
    this.setState ({currentPage: pageNumber});
  };
  handleSubmitSearch = payload => {
    const {getTodayPickups} = this.props;
    this.setState ({loading: true});
    Reservations.search (payload)
      .then (res => {
        this.setState ({searched: false});
        if (res.is_error) return console.log (res.error_content);
        console.log ('SEARCH', res.content);
        const todayWork = {
          date: moment (new Date ().toLocaleString ()).format ('LL'),
          bookings: res.content,
        };
        this.setState ({searched: true, loading: false});
        getTodayPickups (todayWork);
      })
      .catch (err => {
        console.log ('err', err);
        this.setState ({loading: false});
      });
  };

  render () {
    const {todayPickups} = this.props;
    const {searched, loading} = this.state;
    console.log (todayPickups);
    return (
      <DashCard
        title="TODAY'S PICKUP AND DROP OFF CALENDAR"
        subhead={todayPickups ? todayPickups.date + ' - car-calendar' : ''}
        classNames={{title: 'default'}} //check the keyvalue with the backend
      >
        <SearchForm
          handleSubmit={this.handleSubmitSearch}
          handleClear={this.fetchData}
          loading={loading}
        />
        {searched &&
          <h4 className="mb-3 text-info">
            Search Results:

          </h4>}

        <div className="table-responsive pb-4">
          {todayPickups &&
            todayPickups.bookings.length > 0 &&
            <table className="table   hover striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Pickup Location </th>
                  <th>Drop Off Location</th>
                  <th>Booking Ref</th>
                  <th>&euro; Total</th>
                  <th>&euro; Deposit</th>
                  <th>&euro; Balance</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.getCurrentBookings ().map ((booking, idx) => (
                  <tr key={booking._id}>
                    <td>{booking.CustomerFirstName}</td>
                    <td>{booking.CustomerLastName}</td>
                    <td>
                      {moment (booking.DateStart).calendar ()}
                    </td>
                    <td>{moment (booking.DateEnd).calendar ()}</td>
                    <td>{booking.BookingNumber}</td>
                    <td className="text-primary">{booking.TotalCharge}</td>
                    <td className="text-success">{booking.Deposit}</td>
                    <td className="text-warning">{booking.Balance}</td>
                    <td>
                      <div className="btn-group rounded mb-1">
                        <button
                          onClick={() => this.handleShowBooking (true, booking)}
                          className="btn rounded btn-primary mb-0 btn-sm"
                        >
                          details
                        </button>
                        <button
                          onClick={() =>
                            this.handleShowEmailModal (true, booking)}
                          className="btn rounded ml-1  btn-warning mb-0 btn-sm"
                        >
                          email
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
          {todayPickups &&
            (todayPickups.bookings.length === 0 &&
              <div className="container pl-0 mb-4 pb-4">
                <h4 className="text-muted">No Bookings Found :( </h4>
              </div>)}

          <hr />
          {todayPickups &&
            <Pagination
              totalBookings={todayPickups.bookings.length}
              bookingsPerPage={this.state.bookingsPerPage}
              currentPage={this.state.currentPage}
              changePage={this.changePage}
            />}
        </div>
        <BookingDetails
          show={this.state.showBooking}
          onHide={() => {
            this.setState ({showBooking: false});
            this.props.setNullCurrentBooking ();
          }}
        />
        <EmailCustomer
          show={this.state.showEmailModal}
          onHide={() => {
            this.setState ({showEmailModal: false});
            this.props.setNullCurrentBooking ();
          }}
        />
      </DashCard>
    );
  }
}

const mapStateToProps = state => ({
  todayPickups: state.overview.todayPickups,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      getTodayPickups,
      setCurrentBooking,
      setNullCurrentBooking,
    },
    dispatch
  );

export default connect (mapStateToProps, mapDispatchToProps) (TodayPickUps);
