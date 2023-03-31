class FileAddCommand extends MenuSubCommand{
    constructor() {
        super();
        this._name ='FileAdd';
        this._action;
    }
    getAction() {
        return this._action = prompt('Введите имя', );
    }
}
