class MenuSubCommand{
    constructor() {
        this._name = undefined;
        this._items = [];
        this._action = undefined;
    }
    getName(){
        return this._name;
    }
    getItems(){
        return this._items;
    }
    getAction(){
        return this._action;
    }
}