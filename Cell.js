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
        td.appendChild(input);
        this._input = input;
        this.inputOnClick(input);
        this.inputKeydown(input, td);
    }

    getInput() {
        return this._input;
    }

    removeInput() {

        if (this._value === undefined) {
            this._td.innerHTML = '';
        } else {
            this._td.innerHTML = this._value;
        }
        this._input = undefined;
    }

    getActiveCell() {
        return this._activeCell;
    }

    cursorPositions(e) {
        this._masxy = [];
        let X = document.getElementById('X');
        let Y = document.getElementById('Y');
        X.value = e.pageX;
        Y.value = e.pageY;
        this._masxy.push(X.value, Y.value);
        this._masxy.push();
    }

    getPositionOfCursor() {
        addEventListener('mousemove', this.cursorPositions, false);
    }

    inputOnClick(input) {
        input.addEventListener("dblclick", (e) => {
            input.setSelectionRange(this._masxy[0], this._masxy[1]);
            input.focus();
            this.cursorPositions(e);
        })
    }

    inputKeydown(input, td) {
        input.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this._value = input.value;
                this.removeInput();
                td.classList.remove('verticalStyle');
            }
        });
    }
}
