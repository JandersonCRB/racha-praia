import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';

class Player extends Connect {
    namespace = 'v1';
    resource = 'players';

    load(callback = {}) {
        let path = this.api.endpoint + [this.namespace, this.resource].join('/');
        this.get({ path, callback });
    }
    add(data, callback = {}) {
        let path = this.api.endpoint + [this.namespace, this.resource].join('/');
        this.post({ path, callback, data });
    }
}

mix(Player, scopes.readable);
mix(Player, scopes.writable);
mix(Player, scopes.api);

export default Player;