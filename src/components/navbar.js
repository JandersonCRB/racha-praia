import React from 'react';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import MenuIcon from 'material-ui-icons/Menu';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import DraftsIcon from 'material-ui-icons/Drafts';

class MyNavbar extends React.Component {
	constructor() {
		super();
		this.state = {
			drawer: false
		}
	}
	render() {
		console.log(this.state);
		return (
			<React.Fragment>
				<AppBar position="static">
					<Toolbar>
						<IconButton color="secondary" style={{ marginLeft: -12, marginRight: 20 }} aria-label="Menu" onClick={() => this.setState({drawer: true})}>
							<MenuIcon />
						</IconButton>
						<h1>
							Title
					</h1>
						<Button style={{ marginLeft: 'auto' }} color="secondary">Login</Button>
					</Toolbar>
				</AppBar>
				<Drawer open={this.state.drawer} onClose={() => this.setState({drawer: false})}>
					<div
						tabIndex={0}
						role="button"
					onClick={() => this.setState({drawer: false})}
					onKeyDown={() => this.setState({drawer: false})}
					>
						<List>
							<ListItem button>
								<ListItemIcon>
									<DraftsIcon />
								</ListItemIcon>
								<ListItemText primary="Drafts" />
							</ListItem>
						</List>
					</div>
				</Drawer>
			</React.Fragment>
		)
	}
}

export default MyNavbar;