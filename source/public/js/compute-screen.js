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
            station: this.stationInput
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
    }

    _saveInputs() {
        this.startdate = this.startdateInput.value;
        this.enddate = this.enddateInput.value;
        this.station = this.stationInput.value;
    }
}