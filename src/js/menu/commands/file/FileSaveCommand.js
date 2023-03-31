class FileSaveCommand extends MenuSubCommand{
    constructor() {
        super();
        this._name ='FileSave';
        this._action = this.getAction();
    }
    getAction() {
        let audio = new Audio();
        audio.src = 'C:/projects/excel/src/images/sea.mp3';
        audio.autoplay = true;
    }
}
