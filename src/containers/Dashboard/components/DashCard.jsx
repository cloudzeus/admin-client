import React from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import PropTypes from 'prop-types';

const DashCard = props => (
  <Col md={12}>
    <Card>
      <CardBody className="pb-1">
        <div className="card__title mb-2">
          <h4 className={`bold-text text-${props.classNames.title}`}>
            &euro;{props.title}
          </h4>
          <h4 className="subhead">{props.subhead.toUpperCase ()}</h4>
        </div>
        <div>{props.children}</div>
      </CardBody>
    </Card>
  </Col>
);

DashCard.propTypes = {
  title: PropTypes.string,
  subhead: PropTypes.string,
  classNames: PropTypes.shape ({
    title: PropTypes.string.isRequired,
  }),
};

export default DashCard;
