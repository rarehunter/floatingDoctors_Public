import React, { Component } from 'react';
import Layout from './Layout.jsx';
import Counter from './Counter.jsx';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Counter />
      </Layout>
    );
  }
}

