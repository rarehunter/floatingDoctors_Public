import styles from './app.css';
import React, { Component } from 'react';
import Layout from './Layout.jsx';
import Counter from './Counter.jsx';
import Chart from './chart.jsx';
import Records from './Records.jsx';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Chart />
      </Layout>
    );
  }
}

