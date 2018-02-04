import React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';

import Player from '../Player/Player'
import { observer } from 'mobx-react'

import './Home.css'

@observer(['players'])
export default class Home extends React.Component {
	componentWillMount() {
		this.props.players.fetchAll();
	}
	render() {
		return (
			<div className="container">
				<div className="home">
					<Grid>
						<Row className="show-grid">
							{this.props.players.all.slice().map(info => (
								<Col key={info.id} xs={6} lg={4} md={6} sm={12}>
									<Player {...info} />
								</Col>
							))}
						</Row>
					</Grid>
				</div>
			</div>
		)
	}
}