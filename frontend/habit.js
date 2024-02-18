const apiUrl ='https://habittracker-q6ux.onrender.com'
const frontendurl='https://habit-tracker-frontend-olive.vercel.app';


const userString = localStorage.getItem("user");
let user;
if (userString) {
  user = JSON.parse(userString);
  console.log(user);
  // Now 'user' is a JavaScript object containing the parsed user information
} else { console.log("User information not found in local storage");
  const newurl = `${frontendurl}/login.html`;
  window.location.href = newurl;
}

const displayAlert = (message, alertType) => {
  const alertContainer = document.getElementById('alert');
  alertContainer.innerHTML = '';
  // Create alert element
  const alertElement = document.createElement('div');
  alertElement.classList.add('alert', `alert-${alertType}`);
  alertElement.role = 'alert';
  // Alert content
  alertElement.innerHTML = `<span>${message}</span>
    <span class="close-btn" onclick="dismissAlert(this)">&times;</span>`;
    alertContainer.appendChild(alertElement);
    //display alert
      alertElement.style.display = 'block';
      setTimeout(() => dismissAlert(alertElement.querySelector('.close-btn')), 3000);
    };
// Function to dismiss the alert
const dismissAlert = (element) => {
  const alertElement = element.closest('.alert');
  alertElement.style.display = 'none';
};


let userId=user._id;

  async function getallhabits() {
 const habitsContainer = document.getElementById('habitsContainer');
  try {
    const response = await fetch(`${apiUrl}/api/habits/getallhabitsofuser/${userId}`, {
      credentials: 'include',
    }); // Adjust the endpoint based on your backend route
    const habitsData = await response.json();
    console.log(habitsData);
    const data = habitsData.data;
    let habitsHTML = '';

    data.forEach((habit) => {
      const createdAt = new Date(habit.createdAt);
      const formattedDate = createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      habitsHTML += `
      <div class="habit-container">
        <div class="habit">
          <h2>${habit.habitName}</h2>
          <p style="margin:5px;">${habit.description}</p>
          <ul class="habit-days">
          ${habit.days.map((day) => `
          <li class="habit-day">
          ${day.day}
          <button class="complete-button ${day.completed ? 'completed' : ''}" data-id="${habit._id}" data-value="${day.completed ? 'true' : 'false'}" day-id="${day._id}"
            onclick="completeDay(this)"></button>
        </li>`
      ).join('')}
        </ul>
        <div class="habit-buttons" style="margin:8px;">
        <button class="edit-button" onclick="openEditModal('${habit._id}')"><i class="fas fa-edit"></i></button>
        <button class="delete-button" onclick="deleteHabit('${habit._id}')"><i class="fas fa-trash-alt"></i></button>
          <button class="end-button" id="end-button" onclick="endHabit('${habit._id}')">End</i></button>
          <button class="continue-button" onclick="continueHabit('${habit._id}')">Continue</button>
           <span class="info-label">Started:</span>
          <span class="info-valuedate">${formattedDate}</span>
         <span style="margin-left:7px;" class="info-label">Streak:</span>
         <span class="info-value-${habit._id}">${habit.completedDay}</span>
           </div>
        </div>
        </div>
      `;
    });
     habitsContainer.innerHTML = habitsHTML;
  } catch (error) {
    console.error('Error fetching habits:', error);}}
      getallhabits();

function toggleDropdown() {
  const dropdown = document.getElementById('userDropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}


document.addEventListener('click', function (event) {
  const dropdown = document.getElementById('userDropdown');
  if (!event.target.closest('.user-menu') && dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
  }});
//function to toggle complted and remove completd for day
async function completeDay(button) {
const habitId = button.getAttribute('data-id');
  const streakElement=document.querySelector(`.info-value-${habitId}`);
  const dayId = button.getAttribute('day-id');
  const completed = button.getAttribute('data-value') === 'true';
// Update the button appearance
  if (!completed) {
    // If not completed, mark as completed
    if(streakElement){
      streakElement.textContent = parseInt(streakElement.textContent, 10) + 1; }
    button.classList.add('completed');
    button.innerHTML = ''; } 
    else {
    // If already completed, mark as not completed
    if(streakElement){
      streakElement.textContent = parseInt(streakElement.textContent, 10) - 1;}
      button.classList.remove('completed'); }
    // Update the 'data-value' attribute
     button.setAttribute('data-value', completed ? 'false' : 'true');
  //  logic to update the 'completed' status in the database goes here
  try {
    const response = await fetch(`${apiUrl}/api/habits/togglecompleted/${habitId}/${dayId}`);
    const res = await response.json();
    console.log(res);
    if (res) {console.log("toogle success"); }
    } catch (error) { console.log(error);}}


//function to delete habit
async function deleteHabit(habitid) {
  const result=window.confirm("Are you sure you want to delete?");
  if(result){
  const habitId = String(habitid);
  console.log(habitId);
  try {
    const response = await fetch(`${apiUrl}/api/habits/delete/${habitId}/${userId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json',},
      credentials: 'include',
    });
    if (!response.ok) { throw new Error('Failed to delete habit'); }
    const result = await response.json();
    getallhabits();
    displayAlert("Habit deleted successfully","success");
    return { success: true, message: 'Habit deleted successfully',};
  } catch (error) {
    displayAlert("Something went wrong","danger");
    return { success: false, message: error.message || 'Internal server error',};
  }}
}

//function to open modal for edit
function openEditModal(habitId) {
  $('#editHabitModal').modal('show');
  const saveHabits = document.getElementById("saveEditedHabit");
  if (saveHabits) {
    saveHabits.addEventListener('click', () => {
      saveEditedHabit(habitId);});
  }}
function saveEditedHabit(habitId) {
  // Call editHabit function here with the updated values
  const newName = document.getElementById('editHabitName').value;
  const newDescription = document.getElementById('editHabitDescription').value;
  // Call editHabit function with habitId and new values
  editHabit(habitId, newName, newDescription)
}

async function editHabit(habitId, newName, newDescription) {
  if (newName === "" || newDescription === "") {
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.innerText = 'Fields cannot be empty';
    alert("Fields cannot be empty");}
  try {
    const response = await fetch(`${apiUrl}/api/habits/edit/${habitId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({
      habitName: newName,
      description: newDescription,}),
      credentials: 'include',
    });
    if (!response.ok) {throw new Error('Failed to edit habit');}
    //const result = await response.json();
    getallhabits();
    $('#editHabitModal').modal('hide');
    displayAlert("Habit edited successfully","success");
    return {success: true,message: 'Habit edited successfully',};
  } catch (error) {
    displayAlert("Something went wrong","danger");
    return {success: false,message: error.message || 'Internal server error', };
  }}
//model to open model for creating habits
function openCreateModal() {
  $('#createHabitModal').modal('show');
  const createdHabits = document.getElementById("createdHabit");
  if (createdHabits) {
    createdHabits.addEventListener('click', () => {createHabit();});
  }}

function createHabit() {
  // Call your editHabit function here with the updated values

  const Name = document.getElementById('createHabitName').value;
  const Description = document.getElementById('createHabitDescription').value;
  // Call editHabit function with habitId and new values
  CreHabit(Name, Description)
}

async function CreHabit(Name, Description) {
  if (Name === "" || Description === "") {
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.innerText = 'Fields cannot be empty';
    alert("Fields cannot be empty");}
  try {
    const response = await fetch(`${apiUrl}/api/habits/add/${userId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({
        habitName: Name,
        description: Description,
      }),
      credentials: 'include',});
    if (!response.ok) { throw new Error('Failed to create habit');}
    const result = await response.json();
    getallhabits();
    $('#createHabitModal').modal('hide');
    displayAlert("Habit created successfully","success");
    return { success: true, message: result.msg, msg: "habit created"};
  } catch (error) {
    displayAlert("Something went wrong!! Try latter","danger");
    return { success: false, message: error.message || 'Internal server error',}; }}

//end the habit and put it in completed habits array of user
async function endHabit(habitId) {
  console.log("inside end hbait");
  const userId = user._id;
  console.log("userId", userId);
  const id = habitId;
  try {
    const response = await fetch(`${apiUrl}/api/habits/end/${id}/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',}});
    if (!response.ok) {throw new Error('Failed to end habit');}
    const result = await response.json();
    console.log(result);
    displayAlert("Habit ended successfully","success");
    getallhabits();
    return {success: true, message: 'Habit ended successfully',};
  } catch (error) {
    displayAlert("Something went wrong!! Try latter","danger");
   return {success: false,message: error.message || 'Internal server error',};
}};

//function to continue habit for next week
async function continueHabit(habitId) {
  console.log("inside continue hbait");
  const id = habitId;
  try {
    const response = await fetch(`${apiUrl}/api/habits/continue/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', }
    });
    if (!response.ok) {throw new Error('Failed to continue habit');}
    const result = await response.json();
    console.log(result);
    getallhabits();
    displayAlert("Habit continued for more days","success");
   return {success: true,message: 'Habit continued successfully',};
  } catch (error) {
    displayAlert("Something went wrong!! Try latter","danger");
    return {success: false,message: error.message || 'Internal server error', };}};

//redirected to new page conatining previous habits
function completedHabits() {
  console.log("inside compltedhabits");
  const newurl = `${frontendurl}/frontend/completedhabits.html`;
  window.location.href = newurl;
}

function logout() {
  // Clear user information from local storage
  localStorage.removeItem('user');
  console.log('Logout');
  // Redirect or perform any other actions as needed after logout
  const newurl = `${frontendurl}/login.html`;
  window.location.href = newurl;
}
