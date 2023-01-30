class List {
    constructor(paramX, paramY) {
        this._mass = ['A', 'B', 'C', 'D','E','F','G','H','I','K','L','M','N','O','P'];
        this._cals = paramX;
        this._rows = paramY;
        this._cells = [];
        this._tdCells = [];
        this._activeLine = undefined;
        for (let i = 0; i < paramX; i++) {
            let list = [];
            for (let j = 0; j < paramY; j++) {
                let cell = new Cell(this);
                cell.setValue(`${i},${j}`)
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

                td.addEventListener('click', () => {
                   this.returnIndex(i,j);
                   td.innerHTML = this._activeLine;

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
            td.addEventListener('click', () => {
                for (let i = 0; i < this._cals; i++) {
                    for (let k = 0; k < this._rows; k++) {
                        if (j === k) {
                            //console.log(this._tdCells[i][k]);
                            this._tdCells[i][k].classList.add('active');
                        }
                        else{
                            this.clearSelection(i,k);

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
        index = index +1;
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
    clearSelection(i, k){
        this._tdCells[i][k].classList.remove('active');
    }
    returnIndex(number,factLetter){
        factLetter =factLetter+1;
        let letter = this._mass[factLetter-1];
        let increment = Math.floor(factLetter / this._mass.length)
        if(factLetter>this._mass.length) {
            let firstLetter = this._mass[factLetter - this._mass.length - 1]
            let saldo = factLetter - this._mass.length;
            let secondLetter = this._mass[saldo];
            letter = firstLetter + secondLetter;
            if (factLetter  % this._mass.length === 0 && increment > 1) {
                firstLetter = this._mass[increment - 2]
                letter = firstLetter + this._mass[this._mass.length - 2];
            }
            if (factLetter > this._mass.length * increment) {
                saldo = factLetter - this._mass.length * increment;
                firstLetter = this._mass[increment - 1];
                letter = firstLetter + this._mass[saldo-1];
            }
        }
        let factNumber = number+1;
        this._activeLine = `${letter}`+`${factNumber}`;
    }

}
