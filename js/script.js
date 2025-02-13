const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');

/*
Display student cards on the page.  
Show students from an array based on the requested page.
*/

function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const html = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
         `;
         studentList.insertAdjacentHTML('beforeend', html);
      }
   }
}


/*
Rendering pagination buttons. 
Clicking a button calls the showPage function to update the student cards for the selected page.
*/

function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9);
   linkList.innerHTML = '';
   for (let i = 1; i <= numOfPages; i++) {
      const button = `
      <li>
         <button type="button">${i}</button>
      </li>
      `;
      linkList.insertAdjacentHTML('beforeend', button);
   }
   const firstButton = document.querySelector('.link-list button');
   if (firstButton) firstButton.className = 'active';

   linkList.addEventListener("click", (e) => {
      const activeButton = linkList.querySelector('.active');
      const clickedButton = e.target.closest('button');
      if (clickedButton) {
         activeButton.classList.remove('active');
         clickedButton.classList.add('active');
         showPage(list, clickedButton.textContent);
      }
   });
}

// Create search bar

function addSearchBar() {
   const header = document.querySelector('.header');
   const searchBar = `
   <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
   header.insertAdjacentHTML('beforeend', searchBar);
}


// Call functions

addSearchBar();
addPagination(data);
showPage(data, 1);


// Select search elements

const search = document.getElementById('search');
const searchButton = document.querySelector('.student-search button');

// Search functionality

function searchStudents() {
   const searchResults = [];
   const userInput = search.value.toLowerCase();
   for(let i=0; i < data.length; i++) {
      const fullName = data[i].name.first + ' ' + data[i].name.last;
      if(fullName.toLowerCase().includes(userInput)) {
         searchResults.push(data[i]);
      }
   }
   if(searchResults.length > 0) {
      addPagination(searchResults);
      showPage(searchResults, 1);
   } else {
      studentList.innerHTML = '<h1>No results found</h1>';
      linkList.innerHTML = '';
   }
}

// Event listeners for search

search.addEventListener('keyup', searchStudents);
searchButton.addEventListener('click', searchStudents);





