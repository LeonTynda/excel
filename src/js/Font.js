class Font {
    constructor() {

        this._name = 'Font';
        this._fontActive = false;
        this._active = false;
        this._activeDiv = undefined;
        this._Arial = 'Arial'
        this._TimeNewRoman = 'TimeNewRoman';
        this._Roboco = 'Roboco';
        this._List = [];
        this._List.push(this._Arial);
        this._List.push(this._TimeNewRoman);
        this._List.push(this._Roboco);
        this._styleFont = undefined

    }

    renderInstruments() {
        let fonts = document.getElementById('instruments');
        fonts.innerHTML = this.getName();
        let divІnside = document.createElement('div');
        fonts.addEventListener('click', () => {
            if(this._fontActive === false) {
                let items = this.getItems();
                for (let i = 0; i < items.length; i++) {
                    let div = document.createElement('div');
                    div.innerHTML = items[i]
                    div.id = items[i]
                    this.onCommandClick(div,divІnside,fonts );
                    divІnside.appendChild(div);
                }
                fonts.appendChild(divІnside);
                this.setActiveFont();
            }else if(this._fontActive === true){
                let items = this.getItems();
                for (let i = 0; i < items.length; i++) {
                    divІnside.removeChild(divІnside.firstChild);
                }
                this.setDisActiveFont();
            }
        });
    }

    onCommandClick(div) {
          div.addEventListener('click', () => {
              console.log(div.id)
              this._activeDiv = div.id;
              let items = this.getItems();
              for (let i = 0; i < items.length; i++) {
                    if(this._activeDiv === items[i]){
                        this._styleFont = items[i]
                        let evt = new CustomEvent("fontSelected",{
                            detail:{
                                font: this.getStyle()
                            }
                        });
                        document.dispatchEvent(evt);
                        console.log(items[i],7777777,this._styleFont);
                        return items[i]
                    }
              }
            })
    }
    getItems() {
        return this._List;
    }

    getName() {
        return this._name;
    }
    isActive() {
        return this._active;
    }
    setActive(){
        this._active = true;
    }
    setActiveFont(){
        return this._fontActive = true;
    }
    setDisActiveFont(){
        return this._fontActive = false;
    }
    getStyle(){
        return this._styleFont;
    }
}
