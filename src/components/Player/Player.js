import React from 'react';

import { observer } from 'mobx-react';

import '../Home/Home.css'

@observer(['players'])
export default class Player extends React.Component {
	removePlayer = (e) => {
		e.preventDefault();

		this.props.players.remove(this.props.id)
	}
	render() {
		return (
			<div className='card card-player'>
				<h2 className="card-header">{this.props.fullname}</h2>
				<div className="card-body">
					<p className="card-text">{this.props.nickname}</p>
					<button type="button" className="btn btn-primary btn-sm" onClick={e => this.removePlayer(e)}>Remove</button>
				</div>
			</div>
		)
	}

}