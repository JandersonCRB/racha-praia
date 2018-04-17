import React, { Component } from 'react';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import ClearIcon from 'material-ui-icons/Clear';

import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import 'moment/locale/pt-br';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import { inject, observer } from 'mobx-react';


@inject('player')
@inject('match') @observer
class New extends Component {
	constructor() {
		super();
		this.state = {
			players: [],
			team: 0,
			teams: [[], []],
			date: moment(),
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

	submit() {
		const { match } = this.props;
		var teams = this.state.teams;
		teams = teams.map((team) => {
			return {
				player_ids: team.map((player) => {
					return player.id;
				})
			}
		})
		const data = {
			match: {
				date: this.state.date.format("YYYY-MM-DD"),
				teams
			}
		}
		match.add({
			data, callback: {
				201: (body) => {
					alert("Adicionado");
				},
				422: (body) => {
					body.map((error) => {
						alert(error);
					})
				}
			}
		});
	}

	styles = {
		card: {
			maxWidth: 345,
		},
	};
	change(e) {
		this.setState({ search: e.target.value });
	}
	addToTeam(index, player) {
		if (index > 1) return;
		let { teams, players } = this.state;
		teams[index].push(player);
		players = players.filter((v) => v.id !== player.id);
		this.setState({ teams, players });
	}
	removeFromTeam(index, player) {
		if (index > 1) return;
		let { teams, players } = this.state;
		teams[index] = teams[index].filter((v) => v.id !== player.id);
		players.push(player);
		this.setState({ teams, players });
	}
	showListConditions(player) {
		var re = new RegExp(this.state.search + '.+$', 'i');
		return (player.name.search(re) !== -1);
	}
	changeTab(e, v) {
		this.setState({ team: v });
	}
	renderTeam(index) {
		return (
			<Paper elevation={4} style={{ padding: '10px' }}>
				<h3>Time {index + 1}</h3>
				<ul>
					{this.state.teams[index].map((player) => {
						return (
							<li key={player.id}>
								{player.name}
								<Button onClick={() => this.removeFromTeam(index, player)}>
									<ClearIcon />
								</Button>
							</li>
						);
					})}
				</ul>
			</Paper>
		);
	}
	render() {
		let { players, team } = this.state;
		players.sort((a, b) => {
			if (a.name > b.name) {
				return 1;
			}
			if (a.name < b.name) {
				return -1;
			}
			return 0;
		})
		return (
			<React.Fragment>
				<AppBar position="static" color="default" style={{ marginBottom: '5px' }}>
					<Tabs value={team} indicatorColor="primary" textColor="primary" fullWidth onChange={(e, v) => this.changeTab(e, v)} style={{ marginTop: '20px' }}>
						<Tab label="Time 1" />
						<Tab label="Time 2" />
					</Tabs>
				</AppBar>
				<MuiPickersUtilsProvider
					utils={MomentUtils}
					moment={moment}
					locale="pt-br"
				>
					<DatePicker
						label="Data do racha"
						value={this.state.date}
						onChange={(date) => this.setState({ date })}
						animateYearScrolling={false}
					/>
				</MuiPickersUtilsProvider>
				<Paper elevation={4} style={{ padding: '10px', paddingTop: '5px', margin: '2px 2px 15px 2px' }}>
					<TextField fullWidth label="Buscar" onChange={(e) => this.change(e)} value={this.state.search} />
				</Paper>

				<div className="container">
					{this.renderTeam(team)}
					<hr />
					<div className="row">
						{this.state.players.filter((player) => this.showListConditions(player)).map((player) => {
							return (
								<Card key={player.id} className="col-5 mx-auto mb-1 mt-1" styles={this.styles.card}>
									{/* <CardMedia
								image="/static/images/cards/contemplative-reptile.jpg"
								title="Contemplative Reptile"
							/> */}
									<CardContent style={{ overflow: 'hidden' }}>
										<h3>{player.name}</h3>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary" onClick={() => this.addToTeam(team, player)}>
											Adicionar
										</Button>
									</CardActions>
								</Card>
							);
						})}
					</div>
					<Button onClick={() => this.submit()} fullWidth variant="raised" color="primary" style={{ marginBottom: '10px', marginTop: '10px' }}>
						Salvar
					</Button>
				</div>
			</React.Fragment>
		);
	}
}

export default New;