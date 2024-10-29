import { auth } from './firebaseConfig.js';

document.addEventListener('DOMContentLoaded', () => {
  const resetPasswordButton = document.getElementById('reset-password');

  resetPasswordButton.addEventListener('click', () => {
    const user = auth.currentUser;

    if (user && user.email) {
      auth.sendPasswordResetEmail(user.email)
        .then(() => {
          alert(`Password reset email sent to ${user.email}. Please check your inbox.`);
        })
        .catch((error) => {
          console.error('Error sending password reset email:', error.message);
          alert(`Error: ${error.message}`);
        });
    } else {
      alert('No user is currently signed in.');
    }
  });
});
