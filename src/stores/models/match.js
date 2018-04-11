import {Connect, mix} from 'fronto-connect';
import scopes from './scopes';

class Match extends Connect {
    namespace = 'v1';
    resource = 'matches';
}

mix(Match, scopes.readable);
mix(Match, scopes.writable);

export default Match;