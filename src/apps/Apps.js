import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from '../app/header';

class Apps extends Component {
  render() {
    const { accountHistory } = this.props.auth.user;
    return (
      <div>
        <Header />
        <div className="header header-activity mbl">
          <div className="pam phxl-m phm">
            <h2>Apps</h2>
            <fieldset className="form-group man mhs plxs form-apps-searcher">
              <input autoFocus type="text" placeholder="Find a new app" className="paxs" />
            </fieldset>
          </div>
          <nav className="header-nav">
            <ul className="header-ul">
              <li className="header-li">
                <a className="header-a paxs" href="#">
                  <i className="icon icon-sm material-icons">star</i>
                  Featured
                </a>
              </li>
              <li className="header-li">
                <a className="header-a paxs" href="#">
                  <i className="icon icon-sm material-icons">search</i>
                  Browse
                </a>
              </li>
              <li className="header-li">
                <a className="header-a paxs" href="#">
                  <i className="icon icon-sm material-icons">check</i>
                  My Apps
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="block block-apps">
          <ul className="list list-apps">
            <li className="list-element pas">
              <img src="#" alt="Busy" className="list-image mrs" />
              <strong className="list-title">Busy</strong>
              <span className="list-description pls">The social ntework for Steem blokchain</span>
              <i className="icon icon-md material-icons list-icon">keyboard_arrow_right</i>
            </li>
            <li className="list-element pas">
              <img src="#" alt="SteemStats" className="list-image mrs" />
              <strong className="list-title">SteemStats</strong>
              <span className="list-description pls">Steem Account Statistic + Monitoring</span>
              <i className="icon icon-md material-icons list-icon">keyboard_arrow_right</i>
            </li>
            <li className="list-element pas">
              <img src="#" alt="SteemStream" className="list-image mrs" />
              <strong className="list-title">SteemStream</strong>
              <span className="list-description pls">realtime blokchain stream visualisation</span>
              <i className="icon icon-md material-icons list-icon">keyboard_arrow_right</i>
            </li>
            <li className="list-element pas">
              <img src="#" alt="StemmQ" className="list-image mrs" />
              <strong className="list-title">StemmQ</strong>
              <span className="list-description pls">A Decentralized Video Platform for STEEM</span>
              <i className="icon icon-md material-icons list-icon">keyboard_arrow_right</i>
            </li>
            <li className="list-element pas">
              <img src="#" alt="Steem Loto" className="list-image mrs" />
              <strong className="list-title">Steem Loto</strong>
              <span className="list-description pls">Daily Steem Dollars Lottery</span>
              <i className="icon icon-md material-icons list-icon">keyboard_arrow_right</i>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Apps.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object.isRequired,
  })
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Apps);
