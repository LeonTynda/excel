class EditMenu extends MenuCommand{
    constructor() {
        super();
        this._name = 'Edit';

        this._items.push(new EditCopyCommand());
        this._items.push(new EditPasteCommand());

    }

}
