class Menu {
    constructor() {
        this._items = [];
        this._items.push(new FileMenu());
        this._items.push(new EditMenu());
        this._items.push(new WindowMenu());
        this._activeDiv = undefined;
        this._subDivAction = undefined;

    }

    render(){
        let menu = document.getElementById('menu');
        menu.innerHTML = "";
        let items = this.getItems();
        for (let i = 0; i < items.length; i++) {
            let div = document.createElement('div');
            div.innerHTML = items[i].getName();
            div.id = items[i].getName();
            this.onCommandClick(div, items[i]);
            menu.appendChild(div);
        }

    }

    getItem(index) {
        return this.getItems()[index];
    }

    getItems() {
        return this._items;
    }

    onCommandClick(div, itemMenuCommand) {
        div.addEventListener('click', () => {
            if (itemMenuCommand.isActive() === false) {
                this.hideActiveMenu();
                this.showMenuCommand(div, itemMenuCommand);
                this.setActiveMenuCommandDiv(div);
                console.log(itemMenuCommand,111111111)
            } else if (itemMenuCommand.isActive() === true) {
                this.setActiveMenuCommandDiv(div);
                this.hideMenuCommand(div, itemMenuCommand);
                console.log(this._activeDiv,div);
            }
        });
    }
    hideMenuCommand(div, itemMenuCommand) {
        let items = itemMenuCommand.getItems();
        for (let i = 0; i < items.length; i++) {
            div.removeChild(div.lastChild)
        }
        itemMenuCommand.setInActive();
    }
    showMenuCommand(div, itemMenuCommand) {
        let action = new MenuSubCommand().getAction();
        let items = itemMenuCommand.getItems();
        for (let i = 0; i < items.length; i++) {
            let subDiv = document.createElement('div');
            subDiv.innerHTML = items[i].getName();
            subDiv.id = items[i].getName();
            let activeSubdiv = this.setSubDivAction(subDiv.id);

            subDiv.addEventListener('click',()=>{
               if(activeSubdiv === subDiv.innerHTML){
                   action = items[i].getAction()

                   console.log(action)
               }
            })

            div.appendChild(subDiv);
        }
        itemMenuCommand.setActive();
    }
    hideActiveMenu(){
        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i].isActive() === true){
                let activeMenuCommand = this._items[i];
                console.log(activeMenuCommand)
                this.hideMenuCommand(this._activeDiv, activeMenuCommand)
            }
        }
    }
    setActiveMenuCommandDiv(div){
        return this._activeDiv = div;
    }
    setSubDivAction(subDiv){
        return this._subDivAction = subDiv;
    }
    getAction(){
        return this._action;
    }
}