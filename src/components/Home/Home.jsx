import React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';

import Player from '../Player/Player'
import { inject, observer } from 'mobx-react'

import './Home.css'

@inject('player') @observer
export default class Home extends React.Component {
	componentWillMount() {
		const { player } = this.props
		player.load({
			200: (body) => {
				player.setCollection(body);
			}
		});
	}
	render() {
		return (
			<div className="container">
				<div className="home">
					<Grid>
						<Row className="show-grid">
							{this.props.player.collection.slice().map(info => (
								<Col key={info.id} xs={2} lg={4} md={6} sm={12}>
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