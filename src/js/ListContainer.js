class ListContainer {
    constructor() {
        this._lists = [];
        this._actitiveList = 4;
        this._activeButton = 0;
    }
    add(x, y) {
        let list = new List(x, y);
        this._lists.push(list);
        return this._lists;
    }
    remove(number) {
        this._lists.splice(number - 1, 1);
        return this._lists;
    }
    getData() {
        return this._lists;
    }
    getList(number) {
        let list = this._lists[number - 1];
        return list;
    }
    getCount(){
        return this._lists.length;
    }
    getActiveList(){
        return this._actitiveList;
    }
    setActiveList(value){
        this._actitiveList = value;
    }
    setActiveButton(value){
        this._activeButton = value;
    }


}