class Cell {
    constructor(list) {
        this._value = undefined;
        this._type = "string";
        this._input = undefined;
        this._list = list;
        this._td = undefined;
        this._font = undefined
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
            td.classList.add(this._font);
            this._list.removeInputs(this);
            this.showInput(td);
            let cellEvent = new CustomEvent("cellSelected",{
                detail:{
                    cell: this
                }
            });
            document.dispatchEvent(cellEvent);
        });
        this._td = td;
        return td;
    }

    showInput(td) {
        if (this._input !== undefined) {
            return;
        }
        td.innerHTML = '';
        let factInput = this.createInput(td);
        factInput.classList.add(this._font);
        td.classList.add('input');
        td.classList.add(this._font);
        td.appendChild(factInput);
        this._input = factInput;
    }

    getInput() {
        return this._input;
    }

    removeInput() {
        if (this._value === undefined) {
            this._td.innerHTML = '';
        } else {
            this._td.innerHTML = this._value;
            this._td.classList.add(this._font);
        }
        this._input = undefined;
    }
    inputOnClick(input) {
        input.addEventListener("dblclick", (e) => {
            input.focus();
            input.setSelectionRange(input.value.length,input.value.length);
        });
    }

    inputOnKeydown(input, td) {
        input.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this._value = input.value;
                this.removeInput();
                td.classList.remove('verticalStyle');
                console.log(td.height,1000)
            }
        });
    }
    createInput(td){
        let input = document.createElement('input');
        input.classList.add('input');
        if (this._value !== undefined) {
            input.value = this._value;
        }
        this.inputOnClick( input);
        this.inputOnKeydown( input, td);
        return input;
    }
    getFont(){
        return this._font
    }
    setFont(font){
        this.clearFont();
        if(this._input){
            this._input.classList.add(font);
        }
        this._td.classList.add(font);
        this._font = font;
    }
    clearFont(){
        let fonts = new Font().getItems();
        for(let i = 0; i<this._td.classList.length;i++){
            for(let k =0;k<fonts.length;k++){
                if(this._td.classList[i]===fonts[k]){
                   this._td.classList.remove(this._td.classList[i]);
                    if(this._input){
                        this._input.classList.remove(this._td.classList[i]);
                    }
                }
            }
        }
    }

}
