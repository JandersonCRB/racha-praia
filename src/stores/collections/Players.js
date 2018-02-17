import { observable, action } from 'mobx';
import Api from '../api';

class Players {
    path ='/players';
    @observable all = [];
    @observable isLoading = false;

    @action async fetchAll(){
        this.isLoading = false;
        const response = await Api.get(this.path);
        const status = await response.status;

        if(status === 200) {
            const json = await response.json();
            this.all = await json.data
        }
    }

    @action async add(data) {
        const response = await Api.post(this.path, data);
        const status = await response.status;
        if(status === 201){
            this.fetchAll();
        }
    }

    @action find(playerId) {
        return (
            this.all.slice().filter(
                c => c.id === parseInt(playerId, 10)
            )[0]
        );
    }

    @action async remove(playerId){
        this.isLoading = true;
        const response = await Api.delete(`${this.path}/${playerId}`);
        const status = await response.status;

        if(status === 200) {
            this.isLoading = false;
            this.fetchAll();
        }

        const existing = this.all;
        this.all = existing.filter(
            c => c.id !== playerId
        );
    }
}

export default new Players();