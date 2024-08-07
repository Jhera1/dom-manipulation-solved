/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...


// Select the container that holds all the items
const container = document.querySelector('.cardsContainer');

// Function to safely parse JSON from localStorage
const getFavoritesFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  } catch {
    return [];
  }
};

// Function to set the background to red for items in favorites LS
const setFavoritesBackground = () => {
  getFavoritesFromStorage().forEach(id => document.getElementById(id)?.classList.add('red'));
};

// Function to update favorites in localStorage
const updateFavorites = (id, add) => {
  const favorites = new Set(getFavoritesFromStorage());
  add ? favorites.add(id) : favorites.delete(id);
  localStorage.setItem('favorites', JSON.stringify([...favorites]));
};

// Callback function to update the element background color and LS
const updateBackgroundAndFavorites = event => {
  const card = event.target;
  if (card.classList.contains('card')) {
    const id = card.id;
    const add = !card.classList.contains('red');
    card.classList.toggle('red', add);
    updateFavorites(id, add);
  }
};

// Add the event listener to the container
container.addEventListener('click', updateBackgroundAndFavorites);

// Run the function to set favorites background on page load
document.addEventListener('DOMContentLoaded', setFavoritesBackground);