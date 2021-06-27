import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { fetchGetAllUsers } from '../../requests';


function TrybeerProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState({});
  const [listUsers, setListUsers] = useState([]);
  const [valueSearch, setValue] = useState();

  const getAllUsers = async () => {
    const list = await fetchGetAllUsers()
    console.log(list)
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
    listUsers,
    valueSearch,
    setValue,
   };



  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

export { Context, TrybeerProvider as Provider };

TrybeerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
