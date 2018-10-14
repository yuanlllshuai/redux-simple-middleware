import React, { Component } from 'react';
import { syncAction, asynAction } from './testRedux/actions'
import { connect } from 'react-redux'

class App extends Component {
    render() {
        return (
            <button onClick={this.testRedux}>testRedux</button>
        );
    }
    testRedux = () => {
        const { dispatch } = this.props;
        dispatch(syncAction('sync'));
        dispatch(asynAction());
    }
}

export default connect()(App);
