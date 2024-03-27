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
/*  Current User                                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

const pagesArray = [
  'Drake', 
  'Cristiano Ronaldo',
  'Cheech and Chong', 
  'Best Memes'
];

const groupsArray = [
  'Rant HQ',
  'Cheap Meal Ideas', 
  'Girls LOVE Travel', 
  'Engineering Discoveries'
];

const currentUser = new Subscriber(
  'ida534h3',
  'Evan Kennedy',
  'evanck21',
  'evanckennedy@protonmail.com',
  pagesArray, 
  groupsArray, 
  true
)

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Create Post                                          */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function printFileName(event) {
  const fileName = event.target.files[0].name;
  fileNameDisplay.textContent = `${fileName}`;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Event Listeners                                      */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
utils.listen('change', fileInput, printFileName);