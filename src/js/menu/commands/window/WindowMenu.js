class WindowMenu extends MenuCommand{
    constructor() {
        super();
        this._name = 'WindowMenu';
        this._items.push(new WindowReload());
        this._items.push(new WindowClose());
    }

}