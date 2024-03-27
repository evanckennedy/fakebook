'use strict';

// This app requires a server to handle import statements
// and CORS issues
import * as utils from './utils.js';
import Subscriber from './Subscriber.js';


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Selectors                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
const fileInput = utils.select('.file-input');
const fileNameDisplay = utils.select('.file-name');

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Create Post                                          */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function printFileName(event) {
  const fileName = event.target.files[0].name;
  fileNameDisplay.textContent = `${fileName}`;
}

utils.listen('change', fileInput, printFileName);
