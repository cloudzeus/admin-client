import React from 'react';
import {Card, CardBody, Col} from 'reactstrap';

const ExampleCard = props => (
  <Col md={12}>
    <Card>
      <CardBody>
        <div className="card__title mb-2">
          <h4 className={`bold-text `}>
            {props.title}
          </h4>
          <h4 className="subhead">
            {props.subTitle.toUpperCase ()}
          </h4>
        </div>

        {props.children}
      </CardBody>
    </Card>
  </Col>
);

export default ExampleCard;
