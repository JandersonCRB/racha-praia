import {Connect, mix} from 'fronto-connect';
import scopes from './scopes';

import {action} from 'mobx';

class Match extends Connect {
    namespace = 'v1';
    resource = 'matches';

    @action add({data = {}, callback = {}} = {}){
        const path = this.api.endpoint + [this.namespace, this.resource].join('/');
        this.post({path, data, userCallback: callback});
    }
}

mix(Match, scopes.api);

export default Match;