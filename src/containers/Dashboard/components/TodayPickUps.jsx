import React, { Component } from 'react';
import { getTodayPickups } from '../../../redux/actions/overview'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import DashCard from './DashCard'



const todayPickups = {
    date : "23 July 40",
    bookings : [
        {   
            id :2,
            firstName : "Dellan",
            lastName : "Much",
            pickUplocation : "Ruwa",             //Todo : key value from server maybe uppercase  
            dropOffLocation : "Melfort",           //Todo : key value maybe uppercase
            bookingReff : "340wru9u",
            total : 435,
            deposit : 56,
            balance  :453
        },
        {   
            id :4,
            firstName : "Snadra",
            lastName : "Much",
            pickUplocation : "Ruwa",             //Todo : key value from server maybe uppercase  
            dropOffLocation : "Melfort",           //Todo : key value maybe uppercase
            bookingReff : "340wru9u",
            total : 435,
            deposit : 56,
            balance  :453
        },
        {   
            id :45,
            firstName : "Tinashe",
            lastName : "Much",
            pickUplocation : "Ruwa",             //Todo : key value from server maybe uppercase  
            dropOffLocation : "Melfort",           //Todo : key value maybe uppercase
            bookingReff : "340wru9u",
            total : 435,
            deposit : 56,
            balance  :453
        }
    ]
}




class TodayPickUps extends Component {
    constructor(props) {
        super(props);
        this.state = { loaded : false };
    }
    componentDidMount() {
        this.props.getTodayPickups(todayPickups)
        this.setState({loaded:true})
    }
    static propTypes = {
        todayPickups : PropTypes.shape({
            date : PropTypes.string.isRequired,
            bookings :PropTypes.arrayOf(PropTypes.shape({
                id : PropTypes.number.isRequired,
                firstName : PropTypes.string.isRequired,
                lastName : PropTypes.string.isRequired,
                pickUplocation : PropTypes.string.isRequired,             //Todo : key value from server maybe uppercase  
                dropOffLocation : PropTypes.string.isRequired,           //Todo : key value maybe uppercase
                bookingReff : PropTypes.string.isRequired, 
                total : PropTypes.number.isRequired,
                deposit : PropTypes.number.isRequired, 
                balance : PropTypes.number.isRequired,            //Todo : but the correact key value
    
            }))
        })
    }
    static defaultProps = {
        todayPickups : {
            date : "14 June 2019",
            bookings : []
        }
    }
    
    render() {
        const { todayPickups } = this.props
        console.log(todayPickups)
        return (
            <DashCard
            title="TODAY'S PICKUP AND DROP OFF CALENDAR"
            subhead={todayPickups ? todayPickups.date + 'car-calendar' : ''} 
            classNames={{title : 'default'}}      //check the keyvalue with the backend
            >
                {
                    todayPickups && todayPickups.bookings.length > 0 &&
                        <table className="table  hover striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Pickup Location </th>
                                    <th>Drop Off Location</th>
                                    <th>Booking Ref</th>
                                    <th>Total</th>
                                    <th>Deposit</th>
                                    <th>balance</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todayPickups.bookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>{booking.firstName}</td>
                                        <td>{booking.lastName}</td>
                                        <td>{booking.pickUplocation}</td>
                                        <td>{booking.dropOffLocation}</td>
                                        <td>{booking.bookingReff}</td>
                                        <td>{booking.total}</td>
                                        <td>{booking.deposit}</td>
                                        <td>{booking.balance}</td>
                                        <td className="text-danger">{booking.balance}</td>
                                        <td><button className="btn rounded btn-primary">booking Details</button></td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                }
                <hr />
            </DashCard>
        )
         
    }
}

const mapStateToProps = state => ({
    todayPickups : state.overview.todayPickups,
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    getTodayPickups
  },dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(TodayPickUps);