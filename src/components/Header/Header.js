import React from "react"
import { UserPlus, Users } from "lucide-react"

const Header = ({ onAddClick }) => {
  return (
    <div className="header">
      <div className="header-title">
        <Users className="header-icon" />
        <h1>User Management</h1>
      </div>
      <button className="btn-add" onClick={onAddClick}>
        <UserPlus size={20} />
        Add User
      </button>
    </div>
  )
}

export default Header

