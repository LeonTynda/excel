class EditCopyCommand extends MenuSubCommand{
    constructor() {
        super();
        this._name ='EditCopy';
        this._action;
    }
    getAction() {
        let name = prompt('Введите имя', );
        let key = prompt('Введите ключ', );
         localStorage.setItem(key, name);

    }
}