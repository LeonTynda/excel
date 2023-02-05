class Cell {
    constructor(list) {
        this._value = undefined;
        this._type = "string";
        this._input = undefined;
        this._list = list;
        this._td = undefined;
        this._activeCell = undefined;
        this._masxy = [];
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


            this._list.removeInputs(this);
            this.showInput(td);
        });
        this._td = td;
        return td;
    }

    showInput(td) {
        this.getPositionOfCursor()
        if (this._input !== undefined) {
            return;
        }
        td.innerHTML = '';
        let input = document.createElement('input');
        input.contentEditable = 'true';
        input.classList.add('input')
        td.classList.add('input')
        if (this._value !== undefined) {
            input.value = this._value;
        }
        let end = input.value.length;
        let endTd  = input.value;
        console.log(end,endTd)

        td.appendChild(input);
        this._input = input;
        //TODO input focus
        //TODO roztyanut imput
        input.addEventListener("dblclick", (e) => {
            let end = input.value.length;
            input.setSelectionRange(this._masxy[0],this._masxy[1] );
            input.focus();
            input.ariaPosInSet
            this.cursorPositions(e)
            console.log(1111111111111111)

        })
        input.addEventListener("keydown", (e) => {

            //let end = input.value.length;
            //input.setSelectionRange(end,end);
            //input.focus();
            if (e.key === 'Enter') {
                this._value = input.value;
                this.removeInput();
                td.classList.remove('verticalStyle');

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
    cursorPositions(e){

        let X = document.getElementById('X');
        let Y = document.getElementById('Y');
            X.value = e.pageX;
            Y.value = e.pageY;
            this._masxy.push(X.value);
            this._masxy.push(Y.value);
            console.log(this._masxy)
    }
    getPositionOfCursor(){
        addEventListener('mousemove', this.cursorPositions, false);
    }
}
