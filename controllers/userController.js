import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../services/userService.js';

// Create User
export const createUserController = async (req, res) => {
  try {
    const { id, ...userData } = req.body;  // Extract 'id' if provided
    const newUser = await createUser(userData, id);  // Pass 'id' as customDocId if provided
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get All Users
export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User by ID
export const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User by ID
export const updateUserController = async (req, res) => {
  try {
    await updateUser(req.params.id, req.body);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User by ID
export const deleteUserController = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};