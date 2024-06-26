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
const postButton = utils.select('.post-button');
const modal = utils.select('dialog');
const user = utils.select('.header-side i');
const closeModal = utils.select('.close-modal');
const userInfoContainer = utils.select('.user-info-container');

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Current User                                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
const pagesArray = [
  'Drake', 
  'Cristiano Ronaldo'
];

const groupsArray = [
  'Rant HQ',
  'Cheap Meals', 
];

const currentUser = new Subscriber(
  'ida534h3',
  'Evan Kennedy',
  'evanck21',
  'evanck@email.com',
  pagesArray, 
  groupsArray, 
  true
);

function getUserInfo() {
  const info = currentUser.getInfo().split(', ');
  const [name, username, email, pages, groups, monetize] = info;
  const fixedPages = pages.split(',').join(', ');
  const fixedGroups = groups.split(',').join(', ');
  const fixedMonetize = monetize ? 'Yes' : 'No';
  return { 
    Name: name, 
    Username: username, 
    Email: email, 
    Pages: fixedPages, 
    Groups: fixedGroups, 
    Monetized: fixedMonetize
  };
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Modal                                                */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function setModal() {
  let userInfoObj = getUserInfo();
  let infoKeys = Object.keys(userInfoObj);

  userInfoContainer.innerHTML = '';

  for (let key of infoKeys) {
    const p = document.createElement('p');
    p.textContent = `${key}: ${userInfoObj[key]}`;
    userInfoContainer.appendChild(p);
  }
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Create Post                                          */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
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

function getCurrentName() {
  return currentUser.name;
}

function isPostContentEmpty(textContent, fileContent) {
  return !textContent && !fileContent;
}

function clearPostInput() {
  postTextContent.value = '';
  fileInput.value = '';
  fileNameDisplay.textContent = '';
}

function createPost() {
  const textContent = getTextContent();
  const fileContent = fileInput.files.length > 0;

  if (isPostContentEmpty(textContent, fileContent)) {
    return;
  }

  let newPost = document.createElement('div');
  newPost.classList.add('created-post-container', 'flex', 'gap-1');

  let postContent = `
  <div class="new-post-header flex space-between">
    <div class="post-author flex gap-1">
      <i class="fa-solid fa-user"></i>
      <p>${getCurrentName()}</p>
    </div>
    <div>
      <p>${getDate()}</p>
    </div>
  </div>`;
  
  if (textContent) {
    postContent += `<p class="message-post">${textContent}</p>`;
  }

  if (fileContent) {
    const imageUrl = getImage();
    postContent += `<img class="image-post" src="${imageUrl}" alt="uploaded image">`;
  }

  newPost.innerHTML = postContent;

  createdPostsContainer.prepend(newPost);

  clearPostInput();
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Event Listeners                                      */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
utils.listen('change', fileInput, printFileName);
utils.listen('click', postButton, createPost);
utils.listen('click', user, () => {
  setModal();
  modal.showModal();
})
utils.listen('click', closeModal, () => {
  modal.close();
});