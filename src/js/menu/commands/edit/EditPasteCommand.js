class EditPasteCommand extends MenuSubCommand{
    constructor() {
        super();
        this._name ='EditPaste';
        this._action;
    }
    getAction() {
        let key = prompt('Введите ключ имени', );
        let data = localStorage.getItem(key);
        alert('имя ' + data)
    }
}