import React, { Component } from 'react';
import { test } from './testRedux/actions'
import { connect } from 'react-redux'

class App extends Component {
    render() {
        return (
            <button onClick={this.testRedux}>testRedux</button>
        );
    }
    testRedux = () => {
        const { dispatch } = this.props;
        dispatch(test());
    }
}

export default connect()(App);
