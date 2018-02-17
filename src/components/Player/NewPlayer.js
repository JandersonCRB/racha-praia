import React from 'react';

import './NewPlayer.css';

import { observer } from 'mobx-react';

@observer(['players'])
export default class NewPlayer extends React.Component {
	addContact = (e) => {
		e.preventDefault();

		this.props.players.add({
			fullname: this.refs.fullname.value,
			nickname: this.refs.nickname.value,
		});

		this.refs.fullname.value = null;
		this.refs.nickname.value = null;
	}

	render() {
		return (
			<div className="container mt-4" >
				<form onSubmit={this.addContact}>
					<fieldset>
						<div className="form-group">
							<input ref='fullname' type="name" className="form-control" placeholder="Name" />
						</div>
						<div className="form-group">
							<input ref='nickname' type="name" className="form-control" placeholder="Nickname" />
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</fieldset>
				</form>
			</div>
		)
	}
}