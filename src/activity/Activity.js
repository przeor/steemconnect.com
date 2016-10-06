import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from '../app/header';

class Activity extends Component {
  render() {
    const { accountHistory } = this.props.auth.user;
    return (
      <div>
        <Header />
        <div className="header header-activity mbl">
          <div className="pam phxl-m phm">
            <h2>Activity</h2>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </div>
          <nav className="header-nav">
            <ul className="header-ul">
              <li className="header-li">
                <a className="header-a paxs" href="#">
                  <i className="icon icon-sm material-icons">event</i>
                  All Activity
                </a>
              </li>
              <li className="header-li">
                <a className="header-a paxs" href="#">
                  <i className="icon icon-sm material-icons">chat_bubble_outline</i>
                  Blog
                </a>
              </li>
              <li className="header-li">
                <a className="header-a paxs" href="#">
                  <i className="icon icon-sm material-icons">compare_arrows</i>
                  Transfers
                </a>
              </li>
              <li className="header-li">
                <a className="header-a paxs" href="#">
                  <i className="pan icon icon-sm material-icons">save</i>
                  Account Update
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <div className="block block-activity">
            <ul className="list list-activity">
              <li className="list-element pas">
                <div className="list-container">
                  <h3 className="list-title man">Upvote</h3>
                  <span className="list-description">For "New Advanced Formatting Features" by @dan</span>
                </div>
                <span className="list-date">28 September</span>
              </li>
              <li className="list-element pas">
                <div className="list-container">
                  <h3 className="list-title man">Post</h3>
                  <span className="list-description">Oslo Steemit hackaton with Ned Scott</span>
                </div>
                <span className="list-date">today</span>
              </li>
              <li className="list-element pas">
                <div className="list-container">
                  <h3 className="list-title man">Transfer of 120.000 STEEM</h3>
                  <span className="list-description">To @dan</span>
                </div>
                <span className="list-date">today</span>
              </li>
              <li className="list-element pas">
                <div className="list-container">
                  <h3 className="list-title man">Upvote</h3>
                  <span className="list-description">For "It's time for a Steem Bounty System!" by @ned</span>
                </div>
                <span className="list-date">today</span>
              </li>
              <li className="list-element pas">
                <div className="list-container">
                  <h3 className="list-title man">Transfer of 56.00 SBD</h3>
                  <span className="list-description">To @jesf</span>
                </div>
                <span className="list-date">today</span>
              </li>
            </ul>
            <div className="list-more pas">
              <a href="#">See more</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Activity.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object.isRequired,
  })
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
