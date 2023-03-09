class MenuSubCommand{
    constructor() {
        this._name = undefined;
        this._items = [];
    }
    getName(){
        return this._name;
    }
    getItems(){
        return this._items;
    }
}