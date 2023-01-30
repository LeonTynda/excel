class Cell {
    constructor(list) {
        this._value = undefined;
        this._type = "string";
        this._input = undefined;
        this._list = list;
        this._td = undefined;
        this._activeCell = undefined;

    }

    setValue(value) {
        this.trySetType(value);
        this._value = value;
    }

    setType(type) {
        this._type = type;
    }

    trySetType(value) {
        if (typeof value === "number") {
            this.setType("number");
        } else {
            this.setType("string");
        }
    }

    render() {
        let td = document.createElement('td');
        if (this._value !== undefined) {
            td.innerHTML = this._value;
        }
        td.addEventListener('click', () => {
            this.showInput(td);

            this._list.removeInputs(this);


        })
        this._td = td;

        return td;
    }

    showInput(td) {
        if (this._input !== undefined) {
            return;
        }
        td.innerHTML = '';
        let input = document.createElement('input');

        if (this._value !== undefined) {
            input.value = this._value;
        }
        td.appendChild(input);
        this._input = input;
        input.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this._value = input.value;
                //td.classList.add('active');
                this.removeInput();

            }
        });



    }
    getInput(){
        return this._input;
    }

    removeInput(){

        if(this._value === undefined){
            this._td.innerHTML = '';
        }else {
            this._td.innerHTML = this._value;
        }
        this._input = undefined;
    }
    getActiveCell(){
        return this._activeCell;
    }
}
