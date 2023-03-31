class ListContainer {
    constructor() {
        this._lists = [];
        this._actitiveListIndex = 0;
        this._activeButton = 0;
        this._listEvent = undefined;

        document.addEventListener('listSelected',(event)=>{
            console.log(12345678,event.detail.listEvent)
        })

    }
    add(x, y,name) {
        let list = new List(x, y,name);
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
    getActiveListIndex(){
        return this._actitiveListIndex;
    }
    setActiveListIndex(value){

        this._actitiveListIndex = value;
    }
    setActiveButton(value){
        this._activeButton = value;
    }

    getActiveList(){
        return this.getList(this._actitiveListIndex+1)
    }
}