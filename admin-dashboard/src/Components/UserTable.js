import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import '../App.css';

const UserTable = ({
    users,
    onEdit,
    onSave,
    onDelete,
    onSelect,
    selectedRows,
    onSelectAll,
    editableRow,

    editedData,
    setEditedData,
}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={selectedRows.length === users.length}
                            onChange={onSelectAll}
                        />
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id} className={selectedRows.includes(user.id) ? 'selected' : ''}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(user.id)}
                                onChange={() => onSelect(user.id)}
                            />
                        </td>
                        <td>{user.id}</td>
                        <td>
                            {editableRow === user.id ? (
                                <input
                                    type="text"
                                    value={editedData.name || user.name}
                                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                />
                            ) : (
                                user.name
                            )}
                        </td>
                        <td>
                            {editableRow === user.id ? (
                                <input
                                    type="text"
                                    value={editedData.email || user.email}
                                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                                />
                            ) : (
                                user.email
                            )}
                        </td>
                        <td>
                            {editableRow === user.id ? (
                                <input
                                    type="text"
                                    value={editedData.role || user.role}
                                    onChange={(e) => setEditedData({ ...editedData, role: e.target.value })}
                                />
                            ) : (
                                user.role
                            )}
                        </td>
                        <td>
                            {editableRow === user.id ? (
                                <button onClick={() => onSave(user.id, editedData)}>
                                    <SaveIcon />
                                </button>
                            ) : (
                                <button onClick={() => onEdit(user.id)}>
                                    <EditIcon />
                                </button>
                            )}
                            <button onClick={() => onDelete(user.id)}>
                                <DeleteIcon className="row-delete-icon"/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;