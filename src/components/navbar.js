import React from 'react';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import MenuIcon from 'material-ui-icons/Menu';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { browserHistory } from 'react-router';
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import EventAvailableIcon from 'material-ui-icons/EventAvailable';

class MyNavbar extends React.Component {
	constructor() {
		super();
		this.state = {
			drawer: false
		}
	}

	items = [
		{
			onClick: () => browserHistory.push('/players/new'),
			primary: "Adicionar Jogador",
			icon: <PersonAddIcon />
		},
		{
			onClick: () => browserHistory.push('matches/new'),
			primary: "Adicionar partida",
			icon: <EventAvailableIcon />
		}
	]

	render() {
		return (
			<React.Fragment>
				<AppBar position="static">
					<Toolbar>
						<IconButton color="secondary" style={{ marginLeft: -12, marginRight: 20 }} aria-label="Menu" onClick={() => this.setState({ drawer: true })}>
							<MenuIcon />
						</IconButton>
						<Button color="secondary" onClick={() => browserHistory.push('/')}>
							<h3 style={{ marginTop: 'auto', marginBottom: 'auto' }}>Racha</h3>
						</Button>
						<Button style={{ marginLeft: 'auto' }} color="secondary">Login</Button>
					</Toolbar>
				</AppBar>
				<Drawer open={this.state.drawer} onClose={() => this.setState({ drawer: false })}>
					<div
						tabIndex={0}
						role="button"
						onClick={() => this.setState({ drawer: false })}
						onKeyDown={() => this.setState({ drawer: false })}
					>
						{this.items.map((item) => {
							return (
								<React.Fragment>
									<ListItem button onClick={item.onClick} >
										<ListItemIcon>
											{item.icon}
										</ListItemIcon >
										<ListItemText primary={item.primary} />
									</ListItem>
								</React.Fragment>
							);
						})}
					</div>
				</Drawer>
			</React.Fragment>
		)
	}
}

export default MyNavbar;