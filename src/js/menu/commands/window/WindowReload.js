class WindowReload extends MenuSubCommand{
    constructor() {
        super();
        this._name ='WindowReload';
        this._action;
    }
    getAction() {
        return this._action = document.location.reload();
    }
}
