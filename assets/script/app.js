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
const postTextContent = utils.select('.form-container textarea');
const createdPostsContainer = utils.select('.created-posts');
const postButton = utils.select('.post-button')

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
/* Shows the file name the user selected */
function printFileName(event) {
  const fileName = event.target.files[0].name;
  fileNameDisplay.textContent = `${fileName}`;
}

function getTextContent() {
  return postTextContent.value.trim();
}

function getImage() {
  const image = fileInput.files[0];
  const imageUrl = URL.createObjectURL(image);
  return imageUrl;
}

function getDate() {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return currentDate;
}

function getCurrentUserName () {
  return currentUser.userName;
}

function createPost() {
  let newPost = document.createElement('div');
  newPost.classList.add('created-post-container', 'flex', 'gap-1');

  let postContent = `
  <div class="new-post-header flex space-between">
    <div class="post-author flex gap-1">
      <i class="fa-solid fa-user"></i>
      <p>${getCurrentUserName()}</p>
    </div>
    <div>
      <p>${getDate()}</p>
    </div>
  </div>`;

  const textContent = getTextContent();
  if (textContent) {
    postContent += `<p class="message-post">${textContent}</p>`;
  }

  if (fileInput.files.length > 0) {
    const imageUrl = getImage();
    postContent += `<img class="image-post" src="${imageUrl}" alt="uploaded image">`;
  }

  newPost.innerHTML = postContent;

  createdPostsContainer.prepend(newPost);

  clearPostInput();
}

function clearPostInput() {
  postTextContent.value = '';
  fileInput.value = '';
  fileNameDisplay.textContent = '';
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Event Listeners                                      */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
utils.listen('change', fileInput, printFileName);
utils.listen('click', postButton, createPost);