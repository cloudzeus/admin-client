import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'reactstrap';
import DashCard from './components/DashCard';
import {getStats} from '../../redux/actions/overview';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TodayPickUps from './components/TodayPickUps';
import OverviewService from '../../services/Overview';

const overviewService = new OverviewService ();

class Dashboard extends Component {
  componentDidMount () {
    this.fetchData ();
  }
  fetchData = () => {
    overviewService
      .fetch ()
      .then (res => {
        if (res.is_error) return console.log (res.error_content);
        this.props.getStats (res.content);
      })
      .catch (err => {
        console.log ('err', err);
      });
  };
  static defaultProps = {
    stats: {
      totalReservations: 459656,
      totalDeposit: 67,
      totalDebtors: 34,
      totalRevenue: 785,
    },
  };

  render () {
    const {stats} = this.props;
    console.log ('stats', stats);
    return (
      <Container className="dashboard">
        {stats &&
          <Row>
            <Col md={6} lg={3} className="px-0">
              <DashCard
                title={` ${stats.totalDebtors ? stats.totalDebtors.toFixed (2) : 0.00}`}
                classNames={{title: 'danger'}}
                subhead="total debtors"
              />
            </Col>
            <Col md={6} lg={3} className="px-0">
              <DashCard
                title={` ${stats.totalReservations ? stats.totalReservations.toFixed (2) : 0.00}`}
                classNames={{title: 'success'}}
                subhead="total bookings"
              />
            </Col>
            <Col md={6} lg={3} className="px-0">
              <DashCard
                title={` ${stats.totalRevenue ? stats.totalRevenue.toFixed (2) : 0.00}`}
                classNames={{title: 'primary'}}
                subhead="total revenue"
              />
            </Col>
            <Col md={6} lg={3} className="px-0">
              <DashCard
                title={` ${stats.totalDeposit ? stats.totalDeposit.toFixed (2) : 0.00}`}
                classNames={{title: 'warning'}}
                subhead="total deposit"
              />
            </Col>
          </Row>}
        <Row>
          <TodayPickUps />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stats: state.overview.stats,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      getStats,
    },
    dispatch
  );

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard);
