
/*
Display student cards on the page.  
Show students from an array based on the requested page.
*/

function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
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
   const linkList = document.querySelector('.link-list');
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
   firstButton.className = 'active';
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

// create search bar

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

showPage(data, 1);
addPagination(data);
