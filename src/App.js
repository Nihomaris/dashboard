import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './App.css';
import * as Actions from './store/actions';
import { PROJECT_WEBSITE, PROJECT_OTHER } from './store/reducers';

import Dashboard from './containers/dashboard';

class DashBoardApp extends Component {

  componentDidMount() {
    const self = this;
    this.props.getProjects();
    setInterval(function() {
      self.props.getProjects();
    }, 10000)
  }

  render() {
    return (
      <div>
        <Dashboard itemtype={PROJECT_WEBSITE} />
        <Dashboard itemtype={PROJECT_OTHER} />
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    getProjects: () => {
      dispatch(Actions.getProjects())
    }
  }))(DragDropContext(HTML5Backend)(DashBoardApp));
