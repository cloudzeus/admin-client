import React, { Component } from 'react';
import { connect} from 'react-redux'
import { Modal,ModalBody,ModalFooter,ModalHeader,Button } from "reactstrap"
// import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

class BookingDetails extends Component {
    static propTypes = {
        show : PropTypes.bool.isRequired,
        currentBooking : PropTypes.shape({
            id : PropTypes.number.isRequired,
            firstName : PropTypes.string.isRequired,
            lastName : PropTypes.string.isRequired,
            pickUplocation : PropTypes.string.isRequired,             //Todo : key value from server maybe uppercase  
            dropOffLocation : PropTypes.string.isRequired,           //Todo : key value maybe uppercase
            bookingReff : PropTypes.string.isRequired, 
            total : PropTypes.number.isRequired,
            deposit : PropTypes.number.isRequired, 
            balance : PropTypes.number.isRequired,            //Todo : but the correact key value

        }),
        onHide : PropTypes.func.isRequired
    }
    static defaultProps = {
        show : false,
        currentBooking : null
    }
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { onHide, show, currentBooking } = this.props
        return (

            <Modal show={show} onHide={onHide}>
                {
                currentBooking &&
                <React.Fragment>
                    <ModalHeader>
                        <h4 className="bold-text">Booking Details</h4>
                        <h4 className="subhead">{currentBooking.bookingReff}</h4>
                    </ModalHeader>
                    <ModalFooter>
                        <Button onClick={onHide}>Close</Button>
                    </ModalFooter>
                    <ModalBody>
                        <h1>Hello</h1>
                    </ModalBody>                   
                </React.Fragment>
                }
            </Modal>
        );
    }
}



const mapStateToProps = state => ({
    currentBooking : state.overview.currentBooking,
  })
  
//   const mapDispatchToProps = dispatch => bindActionCreators({
//     getTodayPickups
//   },dispatch)


export default connect(mapStateToProps,null)(BookingDetails);
