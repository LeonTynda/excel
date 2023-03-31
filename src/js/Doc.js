class Excel {
    constructor(startListAmount, paramX, paramY) {
        this._menu = new Menu();
        this._instrumets = new Font();
        this._listContainer = new ListContainer();
        for (let i = 0; i < startListAmount; i++) {
            this._listContainer.add(paramX, paramY,i+1);
        }
        document.addEventListener('fontSelected',(event)=>{
            console.log(event.detail.font,666666)
            //todo:get active list s listconteiner
            //todo:get active cell from active list
            //todo: set font for active in td


            let list = this.getListContainer().getActiveList();
            let cell = list.getActiveCell();
            cell.setFont(event.detail.font)
            console.log(list,222222,cell)
        });
    }

    getListContainer() {
        return this._listContainer;
    }

    render(id) {
        this._menu.render();
        this._instrumets.renderInstruments();
        console.log( this._menu.render());
        let tables = [];
        let file = document.getElementById(id);
        for (let i = 0; i < this._listContainer.getCount(); i++) {
            let table = this._listContainer.getList(i + 1).render();
            if (this.getListContainer().getActiveListIndex() === i) {
                table.style.display = 'block';
            } else {
                table.style.display = 'none';

            }
            file.appendChild(table);
            tables.push(table);
        }
        this.renderButtons('data', tables);

    }

    renderButtons(id, tables) {
        let buttons = [];
        let buttonsContainer = document.getElementById(id);
        for (let i = 1; i < this._listContainer.getCount() + 1; i++) {
            let button = document.createElement('input');
            button.setAttribute("name", "list" + i);
            button.setAttribute("type", "button");
            button.id = `${i}`;
            button.value = "list " + i;
            console.log(i, this._listContainer.getActiveListIndex() + 1)
            if (i === this._listContainer.getActiveListIndex() + 1) {
                this.activateButton(button);
            }

            buttonsContainer.appendChild(button);
            buttons.push(button);

            button.addEventListener('click', () => {
                let activeList = document.getElementById(`${i}`).id - 1;
                this._listContainer.setActiveListIndex(activeList);
                this._listContainer.setActiveButton(activeList);
                for (let k = 0; k < tables.length; k++) {
                    console.log(tables)
                    if (activeList === k) {
                        tables[k].style.display = 'block';
                        this.activateButton(button);
                    } else {
                        tables[k].style.display = 'none';
                        this.deactivateButtons(buttons[k])
                    }
                }

            });

        }

    }

    showMaster() {
        let button = document.getElementById('11111');
        button.addEventListener('click', () => {
            return document.getElementById('vitalya').style.display = 'block';
        });

    }

    activateButton(button) {
        button.style.fontWeight = 'bold';
        button.style.backgroundColor = 'red';
    }

    deactivateButtons(button) {
        button.style.fontWeight = 'normal';
        button.style.backgroundColor = 'white';
    }
}
