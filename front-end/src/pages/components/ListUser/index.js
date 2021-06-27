import React, { useContext } from 'react';
import { DevRegisterContext } from '../../../util';
import { DivListUsers } from './styled'

function ListUser() {
 const { setSelectedUser, listUsers } = useContext(DevRegisterContext);


  const selectedItem = ({ target: { value } }) => {
    const [selected] = listUsers.filter((item) => item.id === value )
    setSelectedUser(selected);
  }

  return(
    <DivListUsers>
      <ul>
        {listUsers.map((user) => (
          <li
            value={user.id}
            onClick={ selectedItem }>{user.id} - {user.fullname}</li>
        ))}
      </ul>
    </DivListUsers>
  );
}

export default ListUser;