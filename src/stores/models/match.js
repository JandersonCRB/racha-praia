import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';

import { action } from 'mobx';

class Match extends Connect {
	namespace = 'v1';
	resource = 'matches';

	@action load({ params = {} } = {}) {
		const path = this.api.endpoint + [this.namespace, this.resource].join('/');
		this.get({
			path, params, callback: {
				200: (body) => {
					params.id ? this.setSelected(body) : this.setCollection(body);
				}
			}
		})
	}

	@action add({ data = {}, callback = {} } = {}) {
		const path = this.api.endpoint + [this.namespace, this.resource].join('/');
		this.post({ path, data, userCallback: callback });
	}
}

mix(Match, scopes.api);

export default Match;