import { login, logout } from './login';
import { displayMap } from './leafmap';
import { updateData, updatePassword } from './updateSettings';
import { bookTour } from './stripe';

// DOM ELEMENTS
const leafBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');
const bookBtn = document.getElementById('book-tour');

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateData(form);
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('save-password').innerHTML = 'Updating...';

    const password = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const passwordNewConfirm =
      document.getElementById('password-confirm').value;

    await updatePassword(password, newPassword, passwordNewConfirm);

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';

    document.getElementById('save-password').innerHTML = 'Password updated';
    window.setTimeout(
      () =>
        (document.getElementById('save-password').innerHTML = 'Save Password'),
      1500
    );
  });
}

if (leafBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  displayMap(locations);
}

if (loginForm) {
  // VALUES
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textontent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
