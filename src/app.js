import React, { Component } from 'react';
<<<<<<< HEAD
import { syncAction, asynAction } from './testRedux/actions'
=======
import { test } from './testRedux/actions'
>>>>>>> e65ff41606cba8ad15f3bf627bbe30fefd406202
import { connect } from 'react-redux'

class App extends Component {
    render() {
        return (
            <button onClick={this.testRedux}>testRedux</button>
        );
    }
    testRedux = () => {
        const { dispatch } = this.props;
<<<<<<< HEAD
        dispatch(syncAction('sync'));
        dispatch(asynAction());
=======
        dispatch(test());
>>>>>>> e65ff41606cba8ad15f3bf627bbe30fefd406202
    }
}

export default connect()(App);
