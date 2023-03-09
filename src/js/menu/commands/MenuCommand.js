class MenuCommand{
    constructor() {
        this._name = undefined;
        this._items = [];
        this._active = false;
    }
    getName(){
       return this._name;
    }
    getItems(){
        return this._items;
    }
    isActive() {
        return this._active;
    }
    setActive(){
        this._active = true;
    }
    removeChilds(){
        this._items.length = 0;
    }
    setInActive(){
        this._active = false;
    }
}