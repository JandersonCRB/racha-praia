import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import Select from 'material-ui/Select';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import { MenuItem } from 'material-ui/Menu';

import { inject, observer } from 'mobx-react';


@inject('players')
@inject('Match') @observer
class New extends Component {
	constructor() {
		super();
		this.state = {
			team_a: new Map(),
			team_b: [],
			current_select: { nickname: '' }
		}
	}
	componentWillMount() {
		const { players } = this.props;
		players.fetchAll();
	}

	handleChange = event => {
		let { value } = event.target;
		console.log(value);
		this.setState({ current_select: value });
		console.log(this.state);
		this.forceUpdate();
	};

	renderTeam = (id) => {
		if (id === 'a') {
			let { team_a } = this.state;
			console.log([...team_a]);
			console.log(team_a);
			return (
				[...team_a.values()].map((player, key) => (
					<div key={player.id}>
						{console.log(player.id)}
						<span>{player.nickname}</span>
					</div>
				))
			);
		}
	}


	addPlayer = id => {
		if (id === 'a') {
			// let team_a = this.state.team_a;
			// console.log(this.team_a);
			// team_a.push(this.state.currrent_select);
			// this.setState({ team_a });
			// console.log(this.state);
			let { team_a, current_select } = this.state;
			team_a.set(current_select.id, { ...current_select });
			this.setState({ team_a });
		}
	}

	render() {
		const players = this.props.players.all.slice();
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-sm-4 col-md-4 col-lg-6 col-xs-12">
						<Paper className="mt-4" style={{ padding: 10 }}>
							<div className="ml-auto mr-auto">
								<h2>Time A</h2>
								<Select
									value={this.state.current_select.nickname}
									onChange={this.handleChange}
									style={{ minWidth: 120 }}
									inputProps={{
										name: 'current_select',
										id: 'player',
									}}>
									{players.slice().map(player => {
										return (
											<MenuItem key={player.id} value={player}>{player.nickname}</MenuItem>
										)
									})}
								</Select>
								<Tooltip
									title="Adicionar"
									placement="bottom"
								>
									<IconButton aria-label="Adicionar" onClick={() => this.addPlayer('a')}>
										<AddIcon />
									</IconButton>
								</Tooltip>
								{this.renderTeam('a')}
							</div>
						</Paper>
					</div>
				</div>

			</div>
		);
	}
}

export default New;