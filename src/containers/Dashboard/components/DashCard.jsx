import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import PropTypes from 'prop-types'


const DashCard = props => (
  <Col md={12}>
    <Card>
      <CardBody>
        <div className="card__title">
        <h4 className={`bold-text text-${props.classNames.title}`} >{props.title}</h4>
          <h4 className="subhead">{props.subhead.toUpperCase()}</h4>
        </div>
        <div>{props.children}</div>
      </CardBody>
    </Card>
  </Col>
);

DashCard.propTypes = {
  title : PropTypes.string,
  subhead : PropTypes.string,
  classNames : PropTypes.shape({
    title : PropTypes.string.isRequired
  })
  
}


export default DashCard;
