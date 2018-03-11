import React from 'react';

import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import { observer } from 'mobx-react';

import './NewPlayer.css';

const styles = {
		fields:{
			margin: '10px',
			marginLeft: 'auto',
			marginRight: 'auto'
		}
}

@observer(['players'])
export default class NewPlayer extends React.Component {
	constructor(){
		super();
		this.state = {
			fullname: ''
		}
	}
	addContact = (e) => {
		e.preventDefault();

		this.props.players.add({
			fullname: this.state.fullname,
			nickname: 'x'
		});
	}
	render() {
		return (
			<div className="container mt-4" >
			<div className="text-center">
			<h1>Adicionar Jogador</h1>
				<Paper evelation={2} style={{ padding: 10, maxWidth: '278px', marginLeft: 'auto', marginRight: 'auto' }}>
					<form onSubmit={this.addContact}>
						<fieldset>
							<TextField name='nickname' label='Nome' onChange={fullname => {this.setState({fullname: fullname.target.value})}} value={this.state.fullname} style={styles.fields} fullWidth />
							<Button type="submit" variant="raised" color="primary" fullWidth>Enviar</Button>
						</fieldset>
					</form>
				</Paper>
			</div>
			</div>
		)
	}
}