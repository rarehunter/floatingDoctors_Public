import React from 'react';
import styles from './css/main.css';

export default function Loading(props) {

	return (
		<div className={styles.loader}>
			<div className={styles.loaderInnerText}>
				<label>In Latin America and the Caribbean, about <span style={{fontWeight:'600'}}>30%</span> do not have access to healthcare for economic reasons, and <span style={{fontWeight:'600'}}>21%</span> do not seek care because of geographical barriers.</label>
				<label><span style={{fontWeight:'600'}}>The Floating Doctors</span>, a non-profit organization, delivers health care services to coastal remote communities of Central America.</label>
			</div>
			<div className={styles.loaderInner}>
				<label>	●</label>
				<label>	●</label>
				<label>	●</label>
				<label>	●</label>
				<label>	●</label>
				<label>	●</label>
			</div>
		</div>
	);
}