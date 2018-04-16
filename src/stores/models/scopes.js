const readable = {
	find() { this.findBy(); },
	findBy(parameters) {
		this.setIsLoading(true);
		this.clearSelected();
		this.call({ parameters, type: 'get' }, {
			200: (body) => { this.setSelected(body.data); },
		});
	},
	findAll(parameters) {
		this.setIsLoading(true);
		this.clearCollection();
		this.call({ parameters, type: 'get' }, {
			200: (body) => { this.setCollection(body.data); },
		})
	}
}

const writable = {
	update(parameters, body) {
		this.setIsLoading(true);
		this.call({ parameters, body, type: 'patch' }, {
			200: (response) => this.setSelected(response.data),
		});
	},
	create(parameters, body, callback) {
		this.setIsLoading(true);
		this.call({ parameters, body, type: 'post' }, callback);
	},
	delete(parameters) {
		this.setIsLoading(true);
		this.call({ parameters, type: 'delete' }, {
			200: (response) => this.removeFromColletion(response.data),
		});
	},
}
const request = (method, path, callback, body, file = false) => {
	const h = new Headers();
	if (!file) h.append('Content-Type', 'application/json');
	const { userCallback, defaultCallback } = callback;
	const session = {
		email: localStorage.getItem('email'),
		token: localStorage.getItem('token'),
	};
	if (session.email && session.token) {
		h.append('Authorization', session.token);
	}


	const url = `${path}`;
	const options = { method, headers: h };

	if (body) {
		options.body = file ? body : JSON.stringify(body);
	}

	var status;
	fetch(new Request(url, options))
		.then(response => {
			status = response.status;
			return response.text()
				.then((text) => {
					return text ? JSON.parse(text) : {}
				})
		})
		.then(body => {
			if (userCallback[status]) {
				userCallback[status](body);
			} else if (userCallback['default']) {
				userCallback['default'](body);
			}
			if (defaultCallback[status]) {
				defaultCallback[status](body);
			} else if (defaultCallback['default']) {
				defaultCallback['default'](body);
			}
		});

	return null;
};


const api = {
	get({ path, params = {}, data = {}, callback = {} } = {}) {
		if (params.id) {
			path += `/${params.id}`;
		} else {
			if (Object.keys(params).length !== 0 && params.constructor === Object) { //checks if params is not empty
				path += `?`;
				Object.keys(params).map(e => {
					path += `${e}=${params[e]}&`;
					return null;
				})
				path = path.slice(0, -1); //Removes the last element. which is a '&' character
			}
		}

		const defaultCallback = {
			default: () => this.setIsLoading(false)
		}
		this.setIsLoading(true);
		return request('GET', path, { defaultCallback, userCallback: callback });
	},
	post({ path, data = {}, userCallback = {}, file = false } = {}) {
		const defaultCallback = {
			default: () => this.setIsLoading(false)
		}
		const callback = { defaultCallback, userCallback };
		return request('POST', path, callback, data, file);
	},
	put(path, data = {}, userCallback = {}) {
		const defaultCallback = {
			default: () => this.setIsLoading(false)
		}
		const callback = { defaultCallback, userCallback };
		this.setIsLoading(true);
		return request('PUT', path, callback, data);
	},
	patch({ path, data = {}, callback = {}, file = false } = {}) {
		const defaultCallback = {
			default: () => this.setIsLoading(false)
		}
		this.setIsLoading(true);
		return request('PATCH', path, { defaultCallback, userCallback: callback }, data);
	},
	delete(path, userCallback = {}) {
		const defaultCallback = {
			default: () => this.setIsLoading(false)
		}
		const callback = { defaultCallback, userCallback };
		this.setIsLoading(true);
		return request('DELETE', path, callback);
	}
}
export default { readable, writable, api };