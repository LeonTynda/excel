class List {
    constructor(paramX, paramY) {
        this._mass = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P'];
        this._cals = paramX;
        this._rows = paramY;
        this._cells = [];
        this._tdCells = [];
        this._tdHeaderCells = [];
        this._activeLine = undefined;
        for (let i = 0; i < paramX; i++) {
            let list = [];
            for (let j = 0; j < paramY; j++) {
                let cell = new Cell(this);
                //cell.setValue(`${i},${j}`)
                list.push(cell);
            }
            this._cells.push(list);
        }

    }

    getCells() {
        return this._cells;
    }
    getCell(x, y) {
        return this._cells[x - 1][y - 1];
    }
    render() {
        let table = document.createElement('table');
        for (let i = 0; i < this._rows; i++) {
            let tdList = [];
            let tr = document.createElement('tr');
            if (i === 0) {
                this.renderColumns(table);
            }
            this.renderLeftColumns(i, tr);
            for (let j = 0; j < this._cals; j++) {
                let td = this._cells[i][j].render();
                td.innerHTML =''
                td.addEventListener('click', () => {
                    this.clearDataCells();
                    this.clearHeaderColumns('verticalStyle');
                    td.classList.add('verticalStyle');
                    td.classList.add('colorOfCell')
                    //this.getLetterNumberIndex(i, j);
                    //TODO active input to double click
                    //TODO obodok active
                    //td.innerHTML = this._activeLine;
                });
                tr.appendChild(td);
                tdList.push(td);
            }
            table.appendChild(tr);
            this._tdCells.push(tdList);

        }
        return table;
    }

    removeInputs(activeCell) {
        for (let i = 0; i < this._cals; i++) {
            for (let k = 0; k < this._rows; k++) {
                if (activeCell !== this._cells[i][k] && this._cells[i][k].getInput() !== undefined) {
                    this._cells[i][k].removeInput();
                }
            }
        }
    }

    renderColumns(table) {
        let trColumn = document.createElement('tr');
        let td = document.createElement('td');
        trColumn.appendChild(td);
        for (let j = 0; j < this._cals; j++) {
            let td = document.createElement('td');
            this._tdHeaderCells.push(td);
            td.addEventListener('click', () => {
                this.clearHeaderColumns();
                this.clearDataCells();
                for (let i = 0; i < this._cals; i++) {
                    for (let k = 0; k < this._rows; k++) {
                        if (j === k) {
                            this._tdCells[i][k].classList.add('active');
                            this.setColorToColumn(td);

                        }
                    }
                }

            });
            td.innerHTML = this.getLetterIndex(j);
            trColumn.appendChild(td);
        }
        table.appendChild(trColumn);
    }

    renderLeftColumns(i, tr) {
        let td = document.createElement('td');
        td.innerHTML = `${i + 1}`;
        tr.appendChild(td)
    }

    getLetterIndex(index) {
        index = index + 1;
        let increment = Math.floor(index / this._mass.length)
        let letter = [];
        let startSymbol;
        startSymbol = this._mass[0];
        for (let i = 0; i < this._mass.length; i++) {
            letter = this._mass[(index - 1)];
        }
        if (index > this._mass.length) {
            let saldo = index - this._mass.length;
            letter = startSymbol + this._mass[saldo - 1];
            if (index % this._mass.length === 0 && increment > 1) {
                startSymbol = this._mass[increment - 2]
                letter = startSymbol + this._mass[this._mass.length - 1];
            }
            if (index > this._mass.length * increment) {
                saldo = index - this._mass.length * increment;
                startSymbol = this._mass[increment - 1];
                letter = startSymbol + this._mass[saldo - 1];
                //console.log(letter, 'letter', startSymbol, 'startsymbol', index, 'index', increment, 'incre', this._mass.length, 'massl', saldo, 'saldo')
            }
        }
        return `${letter}`
    }

    getLetterNumberIndex(rowPosition, columnPosition) {
        columnPosition = columnPosition + 1;
        let letter = this._mass[columnPosition - 1];
        let increment = Math.floor(columnPosition / this._mass.length)
        if (columnPosition > this._mass.length) {
            let firstLetter = this._mass[columnPosition - this._mass.length - 1]
            let saldo = columnPosition - this._mass.length;
            let secondLetter = this._mass[saldo];
            letter = firstLetter + secondLetter;
            if (columnPosition % this._mass.length === 0 && increment > 1) {
                firstLetter = this._mass[increment - 2]
                letter = firstLetter + this._mass[this._mass.length - 2];
            }
            if (columnPosition > this._mass.length * increment) {
                saldo = columnPosition - this._mass.length * increment;
                firstLetter = this._mass[increment - 1];
                letter = firstLetter + this._mass[saldo - 1];
            }
        }
        let factNumber = rowPosition + 1;
        return  `${letter}${factNumber}`;
    }

    setColorToColumn(td) {
        td.classList.add('active');
    }

    clearHeaderColumns() {
        for (let i = 0; i < this._tdHeaderCells.length; i++) {
            this._tdHeaderCells[i].classList.remove('active');
        }
    }

    clearDataCells() {
        for (let i = 0; i < this._cals; i++) {
            for (let k = 0; k < this._rows; k++) {
                this._tdCells[i][k].classList.remove('active');
                this._tdCells[i][k].classList.remove('verticalStyle');

                this._tdCells[i][k].classList.remove('colorOfCell')

            }
        }
    }


}
