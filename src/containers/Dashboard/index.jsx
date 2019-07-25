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
          <Col md={6} lg={3}  className="px-0" >
            <DashCard 
            title={`$ ${totalProfit.toString()}`} 
            classNames={{title:'danger'}} subhead="total profit earned">
              <div className="progress">
                  <div className="progress-bar bg-danger"
                   role="progressbar" aria-valuenow="60" aria-valuemin="0" 
                   aria-valuemax="100" style={{width: "60%"}}>
                  </div>
              </div>
            </DashCard>
          </Col>
          <Col md={6} lg={3} className="px-0" >
            <DashCard 
            title={`$ ${totalBookings.toString()}`} 
            classNames={{title:'success'}} subhead="total bookings">
              <div className="progress">
                  <div className="progress-bar bg-success"
                   role="progressbar" aria-valuenow="80" aria-valuemin="0" 
                   aria-valuemax="100" style={{width: "80%"}}>
                  </div>
              </div>
            </DashCard>
          </Col>
          <Col md={6} lg={3} className="px-0" >
            <DashCard 
            title={`$ ${totalCustomers.toString()}`}
           classNames={{title:'primary'}}  subhead="total customers">
              <div className="progress">
                  <div className="progress-bar bg-primary"
                   role="progressbar" aria-valuenow="70" aria-valuemin="0" 
                   aria-valuemax="100" style={{width: "70%"}}>
                  </div>
              </div>
           </DashCard>
          </Col>
          <Col md={6} lg={3} className="px-0" >
            <DashCard  title={`$ ${totalDeposit.toString()}`} 
            classNames={{title:'warning'}} subhead="total deposit" >
              <div className="progress">
                  <div className="progress-bar bg-warning"
                   role="progressbar" aria-valuenow="60" aria-valuemin="0" 
                   aria-valuemax="100" style={{width: "60%"}}>
                  </div>
              </div>              
            </DashCard>
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
