import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from '../app/header';
import Activity from './Activity';
import { getAccountHistory } from '../actions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAccountHistory(this.props.auth.user.name, -1, 5);
  }
  render() {
    const { accountHistory } = this.props.auth.user;
    return (
      <div>
        <Header />
        {accountHistory && <h2>Last Activity</h2>}
        {accountHistory && _.sortBy(accountHistory, 'timestamp').reverse().map(([id, transaction]) =>
          <Activity key={id} id={id} transaction={transaction} />) }
        <div className="block block-dashboard">
          <ul className="list list-dashboard">
            <li className="list-element">
              <img src="#" alt="asd "className="list-image mrs" />
              <strong className="list-title">Some text</strong>
              <span className="list-description pls">Lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
              <i className="icon icon-md material-icons list-icon">keyboard_arrow_right</i>
            </li>
            <li className="list-element">
              <img src="#" alt="asd" className="list-image mrs" />
              <strong className="list-title">Some text</strong>
              <span className="list-description pls">Lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
              <i className="icon icon-md material-icons list-icon">keyboard_arrow_right</i>
            </li>
          </ul>
        </div>

        
        <div className="block block-dashboard">
          <ul className="list list-dashboard">
            <li className="list-element">
              <img src="#" alt="asd "className="list-image mrs" />
              <strong className="list-title">Some text</strong>
              <span className="list-description pls">Lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
              <i className="icon icon-md material-icons list-icon">keyboard_arrow_right</i>
            </li>
            <li className="list-element">
              <img src="#" alt="asd" className="list-image mrs" />
              <strong className="list-title">Some text</strong>
              <span className="list-description pls">Lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
              <i className="icon icon-md material-icons list-icon">keyboard_arrow_right</i>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object.isRequired,
  }),
  getAccountHistory: PropTypes.func,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  getAccountHistory: bindActionCreators(getAccountHistory, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
