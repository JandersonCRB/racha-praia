import React from 'react';
import Player from './Player/Player';
import MyNavbar from './navbar';

import { observer } from 'mobx-react';


import data from './data'

import { Grid, Row, Col, Navbar } from 'react-bootstrap';

@observer(['contacts'])
export default class Index extends React.Component {
	componentWillMount() {
		this.props.contacts.all
	}
	render() {
		return (
			<div id='index'>
				<MyNavbar />
				<Grid>
					<Row className="show-grid">
						{data.map(info => (
							<Col xs={6} md={4}>
								<Player {...info} />
							</Col>
						))}
					</Row>
				</Grid>
			</div>
		)
	}
}