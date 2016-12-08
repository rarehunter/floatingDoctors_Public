import React from 'react';
import styles from './css/main.css';
import * as Meta from './Metadata.jsx';
import * as d3 from 'd3';
import {MdExpandMore, MdKeyboardControl} from 'react-icons/lib/md';
import {Grid, Row, Col, Clearfix } from 'react-bootstrap';


export default class HeaderPage extends React.Component {

	render() {
		const numVisits = this.props.dates.length;
		const beginningDate = this.props.dates[0].substr(4);
		const endDate = this.props.dates[numVisits-1].substr(4);
		const numCommunities = this.props.communities.length;
		const numRecords = this.props.numRecords;


		return (
			<div className={styles.container}>
				<p className={styles.subtitle}>AN INFOVIS FOR</p>

				<h1 className={styles.title}>Floating Doctors</h1>
				<p className={styles.divider}><MdKeyboardControl /></p>
				<p className={styles.dates}>{beginningDate} - {endDate}</p>
				<Row className={styles.row}>
			      <Col xs={12} md={4} className={styles.center}>
			      	<p className={styles.keyword}>{numVisits}</p>
			      	<p className={styles.klabel}>visits</p>
			      </Col>
			      <Col xs={12} md={4} className={styles.center}>
			      	<p className={styles.keyword}>{numCommunities}</p>
			      	<p className={styles.klabel}>communities</p>
			      </Col>
			      <Col xs={12} md={4} className={styles.center}>
			      	<p className={styles.keyword}>{numRecords}</p>
			      	<p className={styles.klabel}>records</p>
			      </Col>
			    </Row>
				<a href="#sectionTwo" className={styles.btnExplore}>EXPLORE <br/><MdExpandMore /></a>

				
			</div>
		);
	}
}