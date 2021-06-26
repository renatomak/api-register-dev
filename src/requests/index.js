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
      const cheked = false;
      const list = data.map((item) => ({ ...item, cheked }));
      console.log(list);
      return list});
}

const fetchUser = (field, query) => {
  const endpoint = `http://localhost:3001/?${field}=${query}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const cheked = false;
      const list = data.map((item) => ({ ...item, cheked }));
      console.log(list);
      return list});
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


export {
  fetchCheckedCEP,
  fetchLanguages,
  fetchUser,
  fetchCreateUser,
};
