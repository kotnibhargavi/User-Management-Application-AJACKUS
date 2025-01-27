import React, { useState, useEffect } from "react"
import UserList from "./components/UserList/UserList"
import UserForm from "./components/UserForm/UserForm"
import Modal from "./components/Modal/Modal"
import Header from "./components/Header/Header"
import { fetchUsers, deleteUser } from "./services/api"
import "./styles/global.css"
import './App.css';

const USERS_PER_PAGE = 5

const App = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers); 
    } catch (err) {
      setError("Failed to fetch users");
    }
  };
  

  const handleAddUser = async (userData) => {
    try {
      // Assign a unique ID for new users, even if they're not synced with the API
      const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1; 
      const newUser = { ...userData, id: newId };
      
      setUsers([...users, newUser]);
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to add user");
    }
  };
  
  
  
  
  
  const handleUpdateUser = async (userData) => {
    try {
      const isExistingUser = users.some((user) => user.id === userData.id);
  
      if (isExistingUser) {
        // Update the user locally if it exists
        setUsers(users.map((user) => (user.id === userData.id ? userData : user)));
      } else {
        // For new users, handle the update
        setUsers(users.map((user) => (user.id === userData.id ? { ...user, ...userData } : user)));
      }
  
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      setError("Failed to update user");
    }
  };
  
  

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id)
      const updatedUsers = users.filter((user) => user.id !== id)
      // Reassigning IDs to remaining users
      const reindexedUsers = updatedUsers.map((user, index) => ({
        ...user,
        id: index + 1, // Reassigning the ID starting from 1
      }))
      setUsers(reindexedUsers)
    } catch (err) {
      setError("Failed to delete user")
    }
  }
  

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  // Pagination
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE)
  const startIndex = (currentPage - 1) * USERS_PER_PAGE
  const paginatedUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE)

  return (
    <div className="app">
      <div className="network-bg"></div>
      <div className="content">
        <Header onAddClick={() => setIsModalOpen(true)} />

        {error && <div className="error-message">{error}</div>}

        <UserList
          users={paginatedUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedUser(null)
          }}
        >
          <UserForm
            user={selectedUser}
            onSubmit={selectedUser ? handleUpdateUser : handleAddUser}
            onCancel={() => {
              setIsModalOpen(false)
              setSelectedUser(null)
            }}
          />
        </Modal>
      </div>
    </div>
  )
}

export default App

