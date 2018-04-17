import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('match') @observer
class ShowMatch extends Component {

	componentWillMount() {
		const { match } = this.props;
		const id = this.props.params.matchId;
		match.load({ params: { id } });
	}

	render() {
		const { selected, isLoading } = this.props.match;
		if (isLoading) { return null }
		return (
			<div className="container">
				{selected.teams.map((team, index) => {
					return (
						<React.Fragment>
							<h1>Time {index+1}</h1>
							<ul>
								{team.map((player) => {
									return <li>{player.name}</li>
								})}
							</ul>
						</React.Fragment>
					)
				})
				}
			</div>
		)
	}
}
export default ShowMatch;