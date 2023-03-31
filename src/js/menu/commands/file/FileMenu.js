class FileMenu extends MenuCommand{
    constructor() {
        super();
        this._name = 'File';

        this._items.push(new FileAddCommand());
        this._items.push(new FileSaveCommand());

    }

}