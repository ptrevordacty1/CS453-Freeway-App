class ComputeScreen {
    constructor(containerElement) {
        this.containerElement = containerElement;

        this.startdate = '';
        this.enddate = '';
        this.station = '';
        this.traveltime = '';
        this.volume = '';

        // inputs
        this.startdateInput = document.querySelector('#startdate');
        this.enddateInput = document.querySelector('#enddate');
        this.stationInput = document.querySelector('#station');
        this.inputForm = document.querySelector('#compute-inputs');
        this._loadStationNames();

        // submit
        this.submitForm =  document.querySelector('#compute-submit');

        // outputs
        this.traveltimeOutput = document.querySelector('#traveltime');
        this.volumeOutput = document.querySelector('#volume');
        this.outputForm = document.querySelector('#compute-outputs');

        // Bind methods
        this._onSubmit = this._onSubmit.bind(this);
        this._saveInputs = this._saveInputs.bind(this);
        
        // events
        this.startdateInput.addEventListener('change', this._saveInputs);
        this.enddateInput.addEventListener('change', this._saveInputs);
        this.stationInput.addEventListener('keyup', this._saveInputs);
        this.submitForm.addEventListener('submit', this._onSubmit);

        this._saveInputs();

        this.containerElement.classList.remove('hidden');
    }

    async _onSubmit(event) {
        event.preventDefault();
        this._saveInputs();

        const params = {
            startdate: this.startdate,
            enddate: this.enddate,
            station: this.station
        }
        const fetchOptions = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };
        const result = await fetch('/save', fetchOptions);
        const json = await result.json();
        
        // Update outputs
        this.traveltimeOutput.readOnly = false;
        this.traveltimeOutput.value = json.traveltime + " s";
        this.traveltimeOutput.readOnly = true;
        
        this.volumeOutput.readOnly = false;
        this.volumeOutput.value = json.volume;
        this.volumeOutput.readOnly = true;
        console.log(json);
    }

    _saveInputs() {
        this.startdate = this.startdateInput.value;
        this.enddate = this.enddateInput.value;
        this.station = this.stationInput.value;
    }

    async _loadStationNames() {

        const fetchOptions = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        const result = await fetch('/load', fetchOptions);
        const json = await result.json();

        const names = json.stationnames;

        for(let name in names) {
            var op = document.createElement("option");
            op.value = names[name];
            op.text = names[name];
            this.stationInput.add(op, null);
        }        
    }
}