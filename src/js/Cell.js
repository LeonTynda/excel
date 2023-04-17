class Cell {
    constructor(list, x, y) {
        this._value = undefined;
        this._type = "string";
        this._input = undefined;
        this._list = list;
        this._td = undefined;
        this._font = undefined;
        this._textWidth = undefined;
        this._coordinate = {x, y};
        this._width = undefined;
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
        let div = document.createElement('div');
        div.width = this._width;
        if (this._value !== undefined) {
            div.innerHTML = this._value;
        }
        td.appendChild(div);
        td.addEventListener('click', () => {
            td.classList.add(this._font);
            this._list.removeInputs(this);
            this.showInput(td,div);
            let cellEvent = new CustomEvent("cellSelected", {
                detail: {
                    cell: this
                }
            });
            document.dispatchEvent(cellEvent);
        });
        this._td = td;
        this.watchResize();
        return td;
    }

    showInput(td,div) {
        if (this._input !== undefined) {
            this.initInput(td, this._input)
            return;
        }
        td.innerHTML = '';
        let input = this.createInput(td,div);
        input.classList.add(this._font);
        td.classList.add('input');
        td.classList.add(this._font);
        td.appendChild(input);
        this._input = input;
    }

    initInput(td, input) {
        let div = document.createElement('div');
        div.innerHTML = td.value;
        td.appendChild(div);
        input.style.position = 'absolute';
        input.style.left = `${td.getBoundingClientRect().left - 7}px`;
        input.style.width = `${td.getBoundingClientRect().width - 5}px`;
        input.style.height = `${div.getBoundingClientRect().height + 20}px`
        input.style.top = `${div.getBoundingClientRect().top - 70}px`;
        this.setTextWidth(input.style.width);
        div.style.display = 'none';
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
            input.setSelectionRange(input.value.length, input.value.length);
        });
    }

    inputOnKeydown(input, td,div) {
        input.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this._value = input.value;
                this.removeInput();
                td.classList.remove('verticalStyle');
                this.setTextWidth(input.style.width);
                if (this._textWidth > this._width) {
                    if(this._coordinate.y+1===this._list._rows){
                        td.style.overflow = 'hidden';
                    }
                    let totalWidth = this._width;
                    for (let i = this._coordinate.y+1; i < this._list._rows; i++) {
                        let nextCell = this._list.getCell(this._coordinate.x + 1, i + 1);
                        totalWidth += nextCell._width;
                        if(nextCell._value){
                            if(i === this._coordinate.y+1){
                                td.style.overflow = 'hidden';
                            }else{
                                td.style.overflow = 'visible';
                                div.style.position = 'absolute'
                               //todo greate div in td in creating
                                //todo set divwidth = totalwidth and divposition absolute and div.overflow hidden;
                            }
                            break;
                        }
                        if(totalWidth>this._textWidth){
                            break;
                        }
                        console.log(nextCell, 'cell',totalWidth)
                    }
                }
                /*if (input.style.width >= (180 + 'px')) {
                    td.style.overflow = 'hidden'
                    console.log(m,this._ativeLineTd);
                }
                if (input.style.width < (180 + 'px')) {
                    td.style.overflow = 'visible'
                    console.log(44444,this._ativeLineTd);
                }*/
            }
        });
    }

    createInput(td,div) {

        let input = document.createElement('input');
        input.classList.add('input');
        this.initInput(td, input);
        if (this._value !== undefined) {
            input.value = this._value;
        }
        input.addEventListener('keydown', (e) => {
            input.style.width = ((input.value.length) * 5.7) + 'px';

        });
        this.inputOnClick(input);
        this.inputOnKeydown(input, td,div);
        return input;
    }

    setFont(font) {
        this.clearFont();
        if (this._input) {
            this._input.classList.add(font);
        }
        this._td.classList.add(font);
        this._font = font;
    }

    clearFont() {
        let fonts = new Font().getItems();
        for (let i = 0; i < this._td.classList.length; i++) {
            for (let k = 0; k < fonts.length; k++) {
                if (this._td.classList[i] === fonts[k]) {
                    this._td.classList.remove(this._td.classList[i]);
                    if (this._input) {
                        this._input.classList.remove(this._td.classList[i]);
                    }
                }
            }
        }
    }

    watchResize() {
        if (this._td.getAttribute('data-observe')) {
            return;
        }
        let observer = new ResizeObserver((entries) => {
            this._width = Math.ceil(entries[0].contentRect.width);
            observer.disconnect();
            this._td.setAttribute('data-observe', undefined);

        });
        observer.observe(this._td);
        this._td.setAttribute('data-observe', 1);
    }

    setTextWidth(width) {
        this._textWidth = parseInt(`${width}`.replace('px', ""));
    }
}
