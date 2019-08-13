import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ModalFooter} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import Reservations from '../../../services/Reservation';

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
      subject: '',
      message: '',
      emailSent: null,
    };
  }
  handleChange = e => {
    this.setState ({[e.target.name]: e.target.value});
  };
  handleSubmit = e => {
    e.preventDefault ();
    this.setState ({loading: true, emailSent: null});
    const {subject, message} = this.state;
    const {customeremail, CustomerFirstName} = this.props.currentCustomer;
    Reservations.sendEmail ({
      subject,
      message,
      customeremail,
      CustomerFirstName,
    })
      .then (res => {
        if (res.is_error) {
          const emailSent = {
            className: 'text-warning',
            message: 'Failed to send email, please try again',
          };
          this.setState ({loading: false, emailSent});
        } else {
          const emailSent = {
            className: 'text-success',
            message: 'Email sent successfully',
          };
          this.setState ({loading: false, emailSent});
        }
      })
      .catch (err => {
        const emailSent = {
          className: 'text-warning',
          message: 'Failed to send email, please try again',
        };
        console.log ('err', err);
        this.setState ({loading: false, emailSent});
      });
  };
  render () {
    const {onHide, show, currentCustomer} = this.props;
    const {loading, message, subject, emailSent} = this.state;
    return (
      <Modal
        title="Contatct Customer"
        subTitle={
          <React.Fragment>
            Email To: {currentCustomer && currentCustomer.customeremail}
          </React.Fragment>
        }
        show={show}
        onHide={onHide}
      >
        {currentCustomer &&
          <form className="mt-4" onSubmit={this.handleSubmit}>
            {emailSent &&
              <p className={`text-center ${emailSent.className}`}>
                {emailSent.message}
              </p>}
            <div className="form-group">
              <label className="form-group-label">Subject</label>
              <div className="form-group-input">
                <input
                  className="form-control"
                  name="subject"
                  type="subject"
                  value={subject}
                  onChange={this.handleChange}
                  required
                  placeholder="Enter email subject"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-group-label">Message</label>
              <div className="form-group-input">
                <textarea
                  className="form-control"
                  value={message}
                  required
                  onChange={this.handleChange}
                  name="message"
                  rows={4}
                  placeholder="Type message here"
                />
              </div>
            </div>
            <ModalFooter>
              {loading
                ? <div className="mx-auto my-2">
                    <svg className="load__icon">
                      <path
                        fill="#4ce1b6"
                        d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                      />
                    </svg>
                  </div>
                : <React.Fragment>
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={onHide}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary ">
                      Send
                    </button>

                  </React.Fragment>}
            </ModalFooter>
          </form>}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentCustomer: state.customers.currentCustomer,
});

//   const mapDispatchToProps = dispatch => bindActionCreators({
//     getTodayPickups
//   },dispatch)

export default connect (mapStateToProps, null) (BookingDetails);
