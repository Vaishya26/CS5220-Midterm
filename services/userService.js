// services/userService.js
import {db} from '../config/firebaseConfig.js';

const collectionName = 'users';

// Create User
export const createUser = async (userData, customDocId = null) => {
  try {
    if (customDocId) {
      // Use a custom document ID and set the data
      const docRef = db.collection(collectionName).doc(customDocId);
      await docRef.set(userData);  // set() with the custom ID
      return { id: customDocId };  // Return the custom ID
    } else {
      // Automatically generate a random document ID
      const docRef = await db.collection(collectionName).add(userData);
      return { id: docRef.id };  // Return the randomly generated ID
    }
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};



// Get All Users
export const getAllUsers = async () => {
  try {
    const snapshot = await db.collection(collectionName).get();
    if (snapshot.empty) return [];

    const users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (error) {
    throw new Error(`Error retrieving users: ${error.message}`);
  }
};

// Get User by ID
export const getUserById = async (id) => {
  try {
    const doc = await db.collection(collectionName).doc(id).get();
    if (!doc.exists) throw new Error('User not found');
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw new Error(`Error retrieving user: ${error.message}`);
  }
};

// Update User by ID
export const updateUser = async (id, userData) => {
  try {
    await db.collection(collectionName).doc(id).update(userData);
    return { message: 'User updated successfully' };
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

// Delete User by ID
export const deleteUser = async (id) => {
  try {
    await db.collection(collectionName).doc(id).delete();
    return { message: 'User deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};
