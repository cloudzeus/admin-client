import React, {  Component } from 'react';
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap';
import DashCard from './components/DashCard';
import { getStats } from '../../redux/actions/overview'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TodayPickUps from './components/TodayPickUps'

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    stats : PropTypes.shape({
      totalProfit : PropTypes.number.isRequired,
      totalBookings : PropTypes.number.isRequired,
      totalCustomers : PropTypes.number.isRequired,
      totalDeposit : PropTypes.number.isRequired
    }).isRequired
  };
   static defaultProps = {
    stats : {
      totalProfit : 459656,
      totalBookings : 67,
      totalCustomers : 34,
      totalDeposit : 785
    }
  }
  
  render() {
    const { totalProfit, totalBookings, totalCustomers, totalDeposit } = this.props.stats
    return(
    <Container className="dashboard">
        <Row>
          <Col md={12} >
            <h3 className="page-title">Booking Dashboard</h3>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="px-0" >
            <DashCard 
            title={`$ ${totalProfit.toString()}`} 
            classNames={{title:'danger'}} subhead="total profit earned" />
          </Col>
          <Col md={3} className="px-0" >
            <DashCard 
            title={`$ ${totalBookings.toString()}`} 
            classNames={{title:'success'}} subhead="total bookings" />
          </Col>
          <Col md={3} className="px-0" >
            <DashCard 
            title={`$ ${totalCustomers.toString()}`}
           classNames={{title:'primary'}}  subhead="total customers"/>
          </Col>
          <Col md={3} className="px-0" >
            <DashCard  title={`$ ${totalDeposit.toString()}`} 
            classNames={{title:'warning'}} subhead="total deposit" />
          </Col>
        </Row>
        <Row>
          <TodayPickUps />
        </Row>
  </Container>)
  }
}


const mapStateToProps = state => ({
  stats : state.overview.stats
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getStats
},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
