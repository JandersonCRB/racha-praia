import React, { Component } from 'react';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import ClearIcon from 'material-ui-icons/Clear';

import { inject, observer } from 'mobx-react';


@inject('player')
@inject('Match') @observer
class New extends Component {
	constructor() {
		super();
		this.state = {
			players: [],
			teams: [[], []],
			search: ''
		}
	}

	componentWillMount() {
		const { player } = this.props;
		player.load({
			200: (body) => {
				this.players = body;
				this.setState({ players: this.players });
			}
		}
		);
	}
	styles = {
		card: {
			maxWidth: 345,
		},
		media: {
			height: 200,
		},
	};
	change(e) {
		this.setState({ search: e.target.value });
	}
	addToTeam(index, player) {
		if (index > 1) return;
		let {teams, players} = this.state;
		teams[index].push(player);
		players = players.filter((v) => v.id !== player.id);
		this.setState({ teams, players });
	}
	removeFromTeam(index, player) {
		if (index > 1) return;
		let {teams, players} = this.state;
		teams[index] = teams[index].filter((v) => v.id !== player.id);
		players.push(player);
		this.setState({ teams, players });
	}
	showListConditions(player){
		var re = new RegExp(this.state.search + '.+$', 'i');
		return (player.name.search(re) !== -1);
	}
	render() {
		let {players} = this.state;
		players.sort((a, b) =>{
			if(a.name > b.name){
				return 1;
			}
			if(a.name < b.name){
				return -1;
			}
			return 0;
		})
		return (
			<div className="container">
				<Paper elevation={4}>
					<h3>Time 1</h3>
					<ul>
						{this.state.teams[0].map((player) => {
							return (
								<li>
									{player.name}
									<Button onClick={() => this.removeFromTeam('0', player)}>
										<ClearIcon />
									</Button>
								</li>
							);
						})}
					</ul>
				</Paper>
				<TextField onChange={(e) => this.change(e)} value={this.state.search} />

				<div className="row">
					{this.state.players.filter((player) => this.showListConditions(player)).map((player) => {
						return (
							<Card className="col-5 mx-auto mb-1 mt-1" styles={this.styles.card}>
								{/* <CardMedia
							image="/static/images/cards/contemplative-reptile.jpg"
							title="Contemplative Reptile"
						/> */}
								<CardContent style={{ overflow: 'hidden' }}>
									<h3>{player.name}</h3>
								</CardContent>
								<CardActions>
									<Button size="small" color="primary" onClick={() => this.addToTeam('0', player)}>
										Adicionar
									</Button>
								</CardActions>
							</Card>
						);
					})}
				</div>
			</div>
		);
	}
}

export default New;