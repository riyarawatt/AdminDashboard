import React, { useState, useEffect } from 'react';
import UserTable from './Components/UserTable';
import Pagination from './Components/Pagination';
import './App.css';
import '@emotion/react';
import '@emotion/styled';
import '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editableRow, setEditableRow] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again.');
            setLoading(false);
        }
    };

    const paginate = (action) => {
        let totalFilteredRows = filteredUsers.length;
        const totalPages = Math.ceil(totalFilteredRows / 10);

        switch (action) {
            case 'first':
                setCurrentPage(1);
                break;
            case 'previous':
                if (currentPage > 1) setCurrentPage(currentPage - 1);
                break;
            case 'next':
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                break;
            case 'last':
                setCurrentPage(totalPages);
                break;
            default:
                // Check if the action is a numeric page
                const numericPage = parseInt(action, 10);
                if (!isNaN(numericPage) && numericPage >= 1 && numericPage <= totalPages) {
                    setCurrentPage(numericPage);
                }
                break;
        }
    };

    const onEdit = (userId) => {
        setEditableRow(userId);
    };

    const onSave = (userId, editedData) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, ...editedData } : user
            )
        );
        setEditableRow(null);
        setEditedData({});
    };

    const onDelete = (userId) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };

    const onSelectAll = () => {
      setSelectAll(!selectAll);

      const currentPageRows = filteredUsers
        .slice((currentPage - 1) * 10, currentPage * 10)
        .map((user) => user.id);

      setSelectedRows((prevSelectedRows) =>
        selectAll ? prevSelectedRows.filter((id) => !currentPageRows.includes(id)) : [...prevSelectedRows, ...currentPageRows]
      );
    };

    const onSelectRow = (userId) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(userId)) {
                return prevSelectedRows.filter((id) => id !== userId);
            } else {
                return [...prevSelectedRows, userId];
            }
        });
    };

    const onDeleteSelected = () => {
        setUsers((prevUsers) =>
            prevUsers.filter((user) => !selectedRows.includes(user.id))
        );
        setSelectedRows([]);
    };

    const onSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <input
                className="search-input"
                size= "50"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={onSearch}
            />
            <div className="delete-selected-container">
                <button onClick={onDeleteSelected}>
                    <DeleteIcon className="delete-icon"/>
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                    <UserTable
                        users={filteredUsers.slice(
                            (currentPage - 1) * 10,
                            currentPage * 10
                        )}
                        onEdit={onEdit}
                        onSave={onSave}
                        onDelete={onDelete}
                        onSelect={onSelectRow}
                        selectedRows={selectedRows}
                        onSelectAll={onSelectAll}
                        editableRow={editableRow}
                        editedData={editedData}
                        setEditedData={setEditedData}
                    />

                    <div className="selected-count-container">
                        <span>{`${selectedRows.length} of ${filteredUsers.length} row(s) selected`}</span>
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filteredUsers.length / 10)}
                        onPageChange={paginate}
                    />
                </>
            )}
        </div>
    );
};

export default App;