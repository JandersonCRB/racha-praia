import React, { Component } from 'react';

import { Link } from 'react-router';

import { inject, observer } from 'mobx-react';

@inject('match') @observer
class MatchesCollection extends Component {

	componentWillMount() {
		const { match } = this.props;

		match.load();
	}

	render() {
		const { collection } = this.props.match;
		return (
			<div className="container">
				<ul>
					{collection.map((match) => {
						return (
							<li>
								<p><Link to={`/matches/${match.id}`}>{match.date || 'No date'}</Link></p>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default MatchesCollection;