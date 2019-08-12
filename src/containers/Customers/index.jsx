import React, {Component, Fragment} from 'react';
import {Container, Row} from 'reactstrap';
import CustomerCard from './components/CustomerCard';
import SearchForm from './components/SearchForm';
import UpdateCustomer from './components/UpdateCustomer';
import Pagination from '../../shared/components/Pagination';
import CustomerService from '../../services/Customers';
import {Link} from 'react-router-dom';
import {
  loadCustomers,
  setCurrentCustomer,
  setNullCurrentCustomer,
} from '../../redux/actions/customers';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CustomModal from '../../shared/components/Modal';

class Customers extends Component {
  constructor (props) {
    super (props);
    this.state = {
      loading: false,
      searched: false,
      showCustomer: false,
      currentPage: 1,
      customersPerPage: 10,
    };
  }
  componentDidMount () {
    this.fetchCustomers ();
  }
  fetchCustomers = () => {
    this.setState ({searched: false});
    CustomerService.fetchAll ()
      .then (res => {
        console.log ('res', res);
        if (res.is_error) return console.log ('res', res.error_content);
        this.props.loadCustomers (res.content);
      })
      .catch (err => {
        console.log ('err', err);
      });
  };
  handleShowCustomer = (show, customer) => {
    if (show) {
      const {setCurrentCustomer} = this.props;
      setCurrentCustomer (customer);
      return this.setState ({showCustomer: true});
    }
  };

  getCurrentCustomers = () => {
    const {currentPage, customersPerPage} = this.state;
    const {customers} = this.props;
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice (
      indexOfFirstCustomer,
      indexOfLastCustomer
    );
    return currentCustomers;
  };
  render () {
    const {loading, searched, showCustomer} = this.state;
    const {customers} = this.props;
    return (
      <Container className="dashboard">
        <Row>
          <CustomerCard
            title="Full Detailed  List Of Customers"
            subTitle={'full details and statistics of your customers'}
          >
            <SearchForm
              loading={loading}
              handleClear={this.fetchCustomers}
              handleSubmit={this.handleSubmitSearch}
            />
            {searched &&
              <h4 className="mb-3 text-info">
                Search Results:

              </h4>}
            <div className="table-responsive pb-4">
              <CustomModal
                title="Customer Details"
                subTitle="EDIT AND SAVE CHANGES"
              >
                hello
              </CustomModal>
              {customers &&
                customers.length > 0 &&
                <table className="table   hover striped">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email Address</th>
                      <th>Phone Number</th>
                      <th>Indentity Number</th>
                      <th className="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.getCurrentCustomers ().map ((customer, idx) => (
                      <tr key={customer._id}>
                        <td>{customer.CustomerFirstName}</td>
                        <td>{customer.CustomerLastName}</td>
                        <td>
                          {customer.customeremail}
                        </td>
                        <td>
                          {customer.CustomerPhoneNumber}
                        </td>
                        <td>{customer.CustomerIdentityNumber}</td>
                        <td>
                          <div className="btn-group float-left rounded mb-1">
                            <Link
                              to={`customer-details/${customer._id}`}
                              className="btn rounded btn-primary mb-0 btn-sm"
                            >
                              details
                            </Link>
                            <button
                              onClick={() =>
                                this.handleShowCustomer (true, customer)}
                              className="btn rounded ml-1  btn-warning mb-0 btn-sm"
                            >
                              edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>}
              {customers &&
                (customers.length === 0 &&
                  <div className="container pl-0 mb-4 pb-4">
                    <h4 className="text-muted">No Customers Found :( </h4>
                  </div>)}

              <hr />
              {customers &&
                <Pagination
                  totalBookings={customers.length}
                  bookingsPerPage={this.state.customersPerPage}
                  currentPage={this.state.currentPage}
                  changePage={this.changePage}
                />}
            </div>
          </CustomerCard>

        </Row>
        <UpdateCustomer
          show={showCustomer}
          onHide={() => {
            this.setState ({showCustomer: false});
            this.props.setNullCurrentCustomer ();
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  customers: state.customers.customerList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      loadCustomers,
      setCurrentCustomer,
      setNullCurrentCustomer,
    },
    dispatch
  );

export default connect (mapStateToProps, mapDispatchToProps) (Customers);
