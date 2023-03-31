class WindowClose extends MenuSubCommand{
    constructor() {
        super();
        this._name ='WindowClose';
        this._action;
    }
    getAction() {
        return this._action = alert('Вы точно хотите выйти?');
    }
}
