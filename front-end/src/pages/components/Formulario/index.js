import React, { useEffect, useState, useContext } from 'react';
import { DivForm, DivTelephone, DivAddress, ContainerButtons, ContainerButtonsSearch, Input, DivSpecialties, Button } from './styled';
import imgSearch from './search_2908.png';
import arrowLeft from './arrow_left.png';
import arrowRight from './arrow_right.png';
import {
  fetchCheckedCEP,
  fetchLanguages,
  fetchCreateUser,
  fetchUser,
  fetchRemoveUser,
  fetchGetAllUsers,
  fetchChange } from '../../../requests'
import { Context } from '../../../util';
const initialAddress = {
  cep: '',
  state: '',
  city: '',
  district: '',
  street: '',
  number: 0,
  complement: '',
}

function Form() {
  const { selectedUser, setSelectedUser, listUsers, setListUsers } = useContext(Context);
  const [fullname, setFullname] = useState('');
  const [homePhone, setHomePhone] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [address, setAddress] = useState(initialAddress);
  const [languages, setLanguages] = useState([]);
  const [disabledExcludButton, setdisabledExcludButton] = useState(true);
  const [position, setPosition] = useState(0);


  const consultaCep = async (valueCep) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4) {
        const { cep, city, complement, district, state, street} = JSON.parse(xhr.response);
        setAddress({...address, cep, street, complement, city, district, state })
        console.log(JSON.parse(xhr.response))
      }
    }
      
    xhr.open('GET', `http://localhost:3001/cep?cep=${valueCep}`);

    xhr.send();    
  }

  const updateLanguages = () => {
    const { Languages } = selectedUser;
 
    const newLanguages = languages.map((item) => {
      if (Languages.some((elem) => elem.id === item.id)) {
        item.checked = true;    
      } else {
        item.checked = false;  
      }
      return item;
    })


    setLanguages(newLanguages)
    console.log(languages)
  }

  const setFields = () => {
    const { fullname, cellPhone, homePhone, addresses } = selectedUser;
    console.log(selectedUser)
    console.log(fullname)
    setFullname(fullname);
    setHomePhone(homePhone);
    setCellPhone(cellPhone);
    setAddress(addresses);
    setdisabledExcludButton(false)
    updateLanguages();
  }

  useEffect(() => {
    const size = (Object.keys(selectedUser)).length
    if (size) {
      setFields();
    }
  }, [selectedUser])

  const getListLanguages = async () => {
    const listLanguages = await fetchLanguages();
    setLanguages(listLanguages);
  }

  useEffect( async () => {
    getListLanguages();
  }, [])

  useEffect(() => {
    const { cep } = address;
    if (cep.length === 8) {
      consultaCep(cep);
    }
  }, [address]);




  const handleChangeHomeFullname = ({ target: { value } }) => {
    setFullname(value);
  }
  const handleChangeHomePhone = ({ target: { value } }) => {
    setHomePhone(value);
  }
  const handleChangeCellPhone = ({ target: { value } }) => {
    setCellPhone(value);
  }
  const handleChangeAddress = async ({ target: { name, value } }) => {
    setAddress({...address, [name]: value });
  }

  const handleChangeCheckbox = ({ target: { value }}) => {

    const newList = languages.map((item) => {
      if (value === item.language) {
        item.checked = item.checked ? false : true;
      }
      return item;
    })
    setLanguages(newList);
  }

  const newUser = () => {
    const userLanguages = languages.filter((item) => {
      return item.checked;
    });

    const user = {
      id: selectedUser.id,
      fullname,
      homePhone, 
      cellPhone, 
      address,
      Languages: userLanguages
    }
    return user;
  }

  const loadNewUsers = async () => {
    const Users = await fetchGetAllUsers();
    setListUsers(Users);
  }

  const register = async () => {
    const user = newUser();
    await fetchCreateUser(user);
    loadNewUsers();
  }

  const search = async () => {
    let query = { field: 'street', value: 'Av.', table: 'Addresses' };
  
    if (fullname) {
      query = { field: 'fullname', value: fullname, table: 'User' };
    }

    console.log(query);
    const result = await fetchUser(query.field, query.value, 'table', query.table);
    console.log(result)
  }

  const next = () => {
    if (position < listUsers.length ) {
      setPosition(position+1);
      setSelectedUser(listUsers[position]);
    } else {
      setPosition(0);
    }
  }

  const previous = () => {
    setPosition(position-1);
    if (position >= 0 ) {
      setSelectedUser(listUsers[position]);
    } else {
      setPosition(listUsers.length-1);
    }

  }

  const clearFields = () => {
    setFullname('');
    setHomePhone('');
    setCellPhone('');
    setAddress(initialAddress);
    setdisabledExcludButton(true)
    getListLanguages();
  }

  const removeUser = async () => {
    clearFields();
    await fetchRemoveUser(selectedUser.id);
    loadNewUsers();
    clearFields();
  }

  const changeUser = async () => {
    const user = newUser();
    clearFields();
    loadNewUsers();
    await fetchChange(user);
  }

  return(
    <DivForm>
      <Input
        type="text"
        placeholder="NOME"
        id="input-fullname-user"
        name="fullname"
        value={ fullname }
        onChange={ handleChangeHomeFullname }/>
      <DivTelephone>
        <Input 
          type="text"
          placeholder="TELEFONE FIXO"
          id="input-home-phone"
          name="homePhone"
          value={ homePhone }
          onChange={ handleChangeHomePhone }
        />
        <Input 
          type="text"
          placeholder="TELEFONE CELULAR"
          id="input-cell-phone"
          name="cellPhone"
          value={ cellPhone }
          onChange={ handleChangeCellPhone }
        />
      </DivTelephone>
      <DivAddress>
        <div className="cep-state-city">
          <Input
            type="text"
            placeholder="CEP"
            id="input-cep"
            name="cep"
            value={ address.cep }
            onChange={ handleChangeAddress }
          />
          <Input
            type="text"
            placeholder="ESTADO"
            id="input-state"
            name="state"
            value={ address.state }
            onChange={ handleChangeAddress }
          />
          <Input
            type="text"
            placeholder="CIDADE"
            id="input-city"
            name="city"
            value={ address.city }
            onChange={ handleChangeAddress }
          />
        </div>
        <div className="district-street-number">
          <Input
            type="text"
            placeholder="BAIRRO"
            id="input-district"
            name="district"
            value={ address.district }
            onChange={ handleChangeAddress }
          />
          <Input
            type="text"
            placeholder="RUA"
            id="input-street"
            name="street"
            value={ address.street }
            onChange={ handleChangeAddress }
          />
          <Input
            type="text"
            placeholder="NUMERO"
            id="input-number"
            name="number"
            value={ address.number }
            onChange={ handleChangeAddress }
          />
        </div>        
        <Input
          type="text"
          placeholder="COMPLEMENTO"
          id="input-complement"
          name="complement"
          value={ address.complement }
          onChange={ handleChangeAddress }
        /> 
      </DivAddress>
      <DivSpecialties>
        { languages.map(({ id, language, checked }, index) => (
          <>
          <input
            type="checkbox"
            className="languages"
            id={id}
            value={ language }
            checked={ checked }
            onChange={ handleChangeCheckbox }
            key={ index }
          />
          <label htmlFor={`language${id}`} >{language}</label>
          </>
        ))}          
      </DivSpecialties>
      <Input
        type="text"
        placeholder="Outras Linguagens? "
        id="input-other"
      /> 
      <ContainerButtons>
        <Button type="button" onClick={ register } >CADASTRO</Button> 
        <ContainerButtonsSearch>
          <button type="button" onClick={ previous } >
            <img src={arrowLeft} alt="voltar"/>
          </button> 
          <button type="button" onClick={ search } id="search" >
            <img src={imgSearch} alt="search"/>
          </button> 
          <button type="button" onClick={ next } >
            <img src={arrowRight} alt="avançar"/>
          </button> 
        </ContainerButtonsSearch>
        <Button type="button" onClick={ removeUser } disabled={ disabledExcludButton } >EXCLUIR</Button>
        <Button type="button" onClick={ changeUser } >ALTERAR</Button>    
      </ContainerButtons>
    </DivForm>
  );
}

export default Form;