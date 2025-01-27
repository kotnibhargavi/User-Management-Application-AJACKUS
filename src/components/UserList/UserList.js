import React from "react"
import "./UserList.css"

const UserList = ({ users, onEdit, onDelete, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="user-list">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="user-row">
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <span className="department-badge">{user.department}</span>
                </td>
                <td className="actions">
                  <button className="btn-edit" onClick={() => onEdit(user)} aria-label="Edit user">
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => onDelete(user.id)} aria-label="Delete user">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`page-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}

export default UserList

