import styles from './app.css';
import React, { Component } from 'react';
import Layout from './Layout.jsx';
import Counter from './Counter.jsx';
import Chart from './chart.jsx';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <h1 className={styles.btn}>Hello!!!!</h1>
        <Counter />
        <Chart />
      </Layout>
    );
  }
}

