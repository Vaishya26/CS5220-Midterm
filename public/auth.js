import { auth } from './firebaseConfig.js';

// Function to send ID token to backend for verification
async function verifyTokenWithBackend() {
  try {
    const idToken = await auth.currentUser.getIdToken(); // Retrieve the ID token

    const response = await fetch('/api/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`Failed to verify token with backend. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Token verified with backend. User ID:', data.uid);
    console.log('User profile:', data.profile); // Display the user profile if needed

    return data; // Optionally return the UID for further use

  } catch (error) {
    console.error('Error retrieving or sending ID token:', error);
  }
}


// Redirect to /chatroom if the user is already logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    if (window.location.pathname === '/' || window.location.pathname === '/signup') {
      window.location.href = '/dashboard';
    }
  }
});




// Export the sign-in function if needed in other parts of your app



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
            verifyTokenWithBackend(); // Call the function here

            window.location.href = '/dashboard';
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
        verifyTokenWithBackend(); // Call the function here

        window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
        alert(`Error logging in: ${error.message}`);
      });
  });

  // GoogleAuthProvider setup
const provider = new firebase.auth.GoogleAuthProvider();

// Google Sign-In function
function signInWithGoogle() {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log('Google Sign-In successful:', user);
      verifyTokenWithBackend(); // Call the function here
      window.location.href = '/dashboard'; // Redirect to dashboard on success
    })
    .catch((error) => {
      console.error('Error during Google Sign-In:', error.message);
      alert(`Error during Google Sign-In: ${error.message}`);
    });
}

// Attach the Google Sign-In function to a button in your HTML
document.getElementById('google-sign-in').addEventListener('click', signInWithGoogle);

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




