import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Card, CardBody} from 'reactstrap';
import './style.scss';

export class index extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  render () {
    return (
      <div
        className={`custom-modal-container ${this.props.show && 'show-modal'}`}
      >
        <Card className="custom-modal-content">
          <CardBody className="bg-white">
            <div className="card__title mb-2">
              <h4 className={`bold-text `}>
                {this.props.title}
                <span
                  onClick={this.props.onHide}
                  className="cancel-btn float-right"
                >
                  &times;
                </span>
              </h4>
              <h4 className="subhead">
                {this.props.subTitle && this.props.subTitle}
              </h4>
            </div>

            {this.props.children}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default index;
