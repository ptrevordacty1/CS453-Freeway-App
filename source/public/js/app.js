class App {
    constructor() {
      const urlPathString = window.location.pathname;
      const parts = urlPathString.split('/');
      if (parts.length > 1 && parts[1] === 'update') {
        this._showUpdateScreen();
      } else {
        this._showComputeScreen();
      }
    }
  
    _showComputeScreen() {
      const viewContainer = document.querySelector('#compute-screen');
      const creatorView = new ComputeScreen(viewContainer);
    }
  
    _showUpdateScreen() {
      const viewContainer = document.querySelector('#update-screen');
      const cardView = new UpdateScreen(viewContainer, cardId);
    }
  }