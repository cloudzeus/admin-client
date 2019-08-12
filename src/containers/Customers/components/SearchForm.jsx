import React, {Component} from 'react';
import {Card, Accordion, Button} from 'react-bootstrap';
import Loader from '../../../shared/components/loaders';

class SearchForm extends Component {
  constructor (props) {
    super (props);
    this.state = {
      customeremail: '',
      CustomerFirstName: '',
      CustomerLastName: '',
      BookingNumber: '',
    };
  }
  handleChange = e => {
    this.setState ({[e.target.name]: e.target.value});
  };
  handleSubmit = e => {
    e.preventDefault ();
    let {
      customeremail,
      CustomerFirstName,
      CustomerLastName,
      BookingNumber,
    } = this.state;
    customeremail = customeremail.trim ().length > 0 ? customeremail : false;
    CustomerFirstName = CustomerFirstName.trim ().length > 0
      ? CustomerFirstName
      : false;
    CustomerLastName = CustomerLastName.trim ().length > 0
      ? CustomerLastName
      : false;
    BookingNumber = BookingNumber.trim ().length > 0 ? BookingNumber : false;
    if (
      !(customeremail || CustomerFirstName || CustomerLastName || BookingNumber)
    )
      return;
    this.props.handleSubmit ({
      customeremail,
      CustomerFirstName,
      CustomerLastName,
      BookingNumber,
    });
    this.setState ({
      customeremail: '',
      CustomerFirstName: '',
      CustomerLastName: '',
      BookingNumber: '',
    });
  };
  render () {
    const {
      customeremail,
      CustomerFirstName,
      CustomerLastName,
      BookingNumber,
    } = this.state;
    const {handleClear, loading} = this.props;
    return (
      <Accordion>
        <Card className="pb-0">
          <Accordion.Toggle
            className="btn-default mb-0 pl-2"
            as={Button}
            variant="link"
            eventKey="0"
          >
            <h5 className="text-left">
              <b>Search</b>
            </h5>

          </Accordion.Toggle>
          <hr className="mt-0 mb-4" />
          <Accordion.Collapse eventKey="0">
            <Card.Body className="py-0 px-0">
              <form method="POST" onSubmit={this.handleSubmit}>
                <div className="form-row form">
                  <div className="col-md-3">
                    <div className="">
                      <label
                        htmlFor="CustomerFirstName"
                        className="form__form-group-label"
                      >
                        <b>First Name</b>
                      </label>
                    </div>
                    <div className="">
                      <input
                        type="text"
                        name="CustomerFirstName"
                        value={CustomerFirstName}
                        onChange={this.handleChange}
                        id="CustomerFirstName"
                        className="form__form-control"
                        placeholder="Search by first name"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="">
                      <label
                        htmlFor="CustomerLastName"
                        className="form__form-group-label"
                      >
                        <b>Last Name</b>
                      </label>
                    </div>
                    <div className="-">
                      <input
                        type="text"
                        name="CustomerLastName"
                        id="CustomerLastName"
                        className="form__form-control"
                        value={CustomerLastName}
                        onChange={this.handleChange}
                        placeholder="Search by last name"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="">
                      <label
                        htmlFor="customeremail"
                        className="form__form-group-label"
                      >
                        <b>Email</b>
                      </label>
                    </div>
                    <div className="-">
                      <input
                        type="email"
                        name="customeremail"
                        id="customeremail"
                        className="form-control"
                        value={customeremail}
                        onChange={this.handleChange}
                        placeholder="Search by  email"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="">
                      <label
                        htmlFor="BookingNumber"
                        className="form__form-group-label"
                      >
                        <b>Booking Number</b>
                      </label>
                    </div>
                    <div className="-">
                      <input
                        type="text"
                        name="BookingNumber"
                        id="BookingNumber"
                        className="form-control"
                        value={BookingNumber}
                        onChange={this.handleChange}
                        placeholder="Search by  booking number"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-muted float-right mt-4">
                  <b>Add any filter you would like to search for</b>
                </p>
                {loading
                  ? <div className="my-2">
                      <Loader size="small" />
                    </div>
                  : <React.Fragment>
                      <button
                        type="submit"
                        className="btn mr-1 btn-success btn-sm mt-3 "
                      >
                        Search
                      </button>
                      <button
                        onClick={handleClear}
                        className="btn btn-sm btn-warning  mt-3 "
                      >
                        Clear
                      </button>
                    </React.Fragment>}
              </form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default SearchForm;
