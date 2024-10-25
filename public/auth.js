import { auth } from './firebaseConfig.js';

// Redirect to /chatroom if the user is already logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    if (window.location.pathname === '/' || window.location.pathname === '/signup') {
      window.location.href = '/chatroom';
    }
  }
});

// Sign Up Logic
if (window.location.pathname === '/signup') {
  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const displayName = document.getElementById('signup-displayname').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user.updateProfile({ displayName: displayName });
      })
      .then(() => {
        // Automatically log in the user after successful registration
        auth.signInWithEmailAndPassword(email, password)
          .then(() => {
            alert('Registration and Login successful!');
            window.location.href = '/chatroom';
          })
          .catch((error) => {
            console.error('Error logging in after signup:', error.message);
            alert(`Error logging in: ${error.message}`);
          });
      })
      .catch((error) => {
        console.error('Error signing up:', error.message);
        alert(`Error signing up: ${error.message}`);
      });
  });
}

// Login Logic
if (window.location.pathname === '/') {
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        alert('Login successful!');
        window.location.href = '/chatroom';
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
        alert(`Error logging in: ${error.message}`);
      });
  });
}

// Logout Logic for /chatroom
if (window.location.pathname === '/chatroom') {
  // Logout button in room section
  document.getElementById('logout').addEventListener('click', () => {
    auth.signOut()
      .then(() => {
        alert('Logged out successfully.');
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error logging out:', error.message);
        alert(`Error logging out: ${error.message}`);
      });
  });

  // Logout button in chat section
  document.getElementById('logout-chat').addEventListener('click', () => {
    auth.signOut()
      .then(() => {
        alert('Logged out successfully.');
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error logging out:', error.message);
        alert(`Error logging out: ${error.message}`);
      });
  });
}
