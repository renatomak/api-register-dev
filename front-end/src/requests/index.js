const headers = { 'Content-type': 'application/json' };

const fetchCheckedCEP = (cep) => {
  const endpoint = `http://localhost:3001/cep?cep=${cep}`;
  
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data);
};

const fetchLanguages = () => {
  const endpoint = `http://localhost:3001/languages`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const checked = false;
      const list = data.map((item) => ({ ...item, checked }));
      console.log(list);
      return list});
}

const fetchUser = ({field, value, table}) => {
  const endpoint = `http://localhost:3001/?field=${field}&value=${value}&table=${table}`;
  console.log(endpoint)
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data );
}

const fetchGetAllUsers = () => {
  const endpoint = `http://localhost:3001/user`;
  console.log(endpoint)
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data );
}

const fetchCreateUser = (user) => {
  const endpoint = `http://localhost:3001/user`;
  
  return fetch(
    endpoint,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(user),
    },)
    .then((response) => response.json())
    .then((data) => data);
}

const fetchRemoveUser = (id) => {
  const endpoint = `http://localhost:3001/user/${id}`;
  
  return fetch(endpoint,
    {
      method: 'DELETE',
      headers,
      body: JSON.stringify({}),
    },)
    .then((response) => response)
}

const fetchChange = (user) => {
  const endpoint = `http://localhost:3001/user`;
  
  return fetch(endpoint,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(user),
    },)
    .then((response) => response)
}

export {
  fetchCheckedCEP,
  fetchLanguages,
  fetchUser,
  fetchCreateUser,
  fetchGetAllUsers,
  fetchRemoveUser,
  fetchChange,
};
