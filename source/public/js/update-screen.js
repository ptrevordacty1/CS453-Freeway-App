class UpdateScreen {
    constructor(containerElement) {
        this.containerElement = containerElement;

        this.stationid = '';
        this.stationnames = {};
        this.oldname = '';
        this.newname = '';

        // inputs
        this.stationIdInput = document.querySelector('#stationid');
        this.oldNameInput = document.querySelector('#oldname');
        this._loadStationNames();
        this.newNameInput = document.querySelector('#newname');

        // submit
        this.submitForm =  document.querySelector('#update-submit');

        // Bind methods
        this._onSubmit = this._onSubmit.bind(this);
        this._saveInputs = this._saveInputs.bind(this);
        
        // events
        this.stationIdInput.addEventListener('change', this._saveInputs);
        this.oldNameInput.addEventListener('change', this._saveInputs);
        this.newNameInput.addEventListener('keyup', this._saveInputs);
        this.submitForm.addEventListener('submit', this._onSubmit);

        this._saveInputs();

        this.containerElement.classList.remove('hidden');
    }

    async _onSubmit(event) {
        event.preventDefault();
        this._saveInputs();

        const params = {
            stationid: this.stationid,
            oldname: this.oldname,
            newname: this.newname
        }
        const fetchOptions = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };
        const result = await fetch('/update', fetchOptions);
        const json = await result.json();
        
    }

    _saveInputs() {
        this.stationid = this.stationIdInput.value;
        this.oldNameInput.value = this.stationnames[this.stationid];
        this.oldname = this.oldNameInput.value;
        this.newname = this.newNameInput.value;
    }

    async _loadStationNames() {

        const fetchOptions = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        const result = await fetch('/update', fetchOptions);
        const json = await result.json();

        this.stationnames = json.stationnames;
        console.log(this.stationnames);
    }
}