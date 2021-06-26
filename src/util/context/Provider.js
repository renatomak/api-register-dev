import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './TrybeerContext';
import { fetchGetAllUsers } from '../../requests';


function TrybeerProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState({});
  const [listUsers, setListUsers] = useState([]);

  const getAllUsers = async () => {
    const list = await fetchGetAllUsers()
    setListUsers(list);
  };

  useEffect(() => {
    getAllUsers()
  }, [])

  useEffect(() => {

  }, [listUsers])




  const context = {
    selectedUser,
    setSelectedUser,
    listUsers,
    setListUsers,
   };



  return (
    <TrybeerContext.Provider value={ context }>
      { children }
    </TrybeerContext.Provider>
  );
}

export { TrybeerContext, TrybeerProvider as Provider };

TrybeerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
