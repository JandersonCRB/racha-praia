import { observable } from 'mobx';

class Contacts {
    @observable all = [
        { id: 1, fullname: 'Janderson', nickname: 'Angelo' },
        { id: 2, fullname: 'James', nickname: 'Angelo' },
        { id: 3, fullname: 'Jadir', nickname: 'Luis' },
    ];
}

export default new Contacts();