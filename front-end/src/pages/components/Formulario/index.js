import React, { useEffect, useState, useContext } from 'react';
import { DivForm, DivTelephone, DivAddress, ContainerButtons, Input, DivLanguages, Button } from './styled';
import {
  fetchLanguages,
  fetchCreateUser,
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
  const { selectedUser, setListUsers, setValue } = useContext(Context);
  const [fullname, setFullname] = useState('');
  const [homePhone, setHomePhone] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [address, setAddress] = useState(initialAddress);
  const [languages, setLanguages] = useState([]);
  const [disabledExcludButton, setdisabledExcludButton] = useState(true);

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
    setLanguages(newLanguages);
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
    if(selectedUser) {
      const size = (Object.keys(selectedUser)).length;
      if (size) {
        setFields();
      }
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
    setValue(value);
  }
  const handleChangeHomePhone = ({ target: { value } }) => {
    setHomePhone(value);
    setValue(value);
  }
  const handleChangeCellPhone = ({ target: { value } }) => {
    setCellPhone(value);
    setValue(value);
  }
  const handleChangeAddress = async ({ target: { name, value } }) => {
    setAddress({...address, [name]: value });
    setValue(value);
  }

  const handleChangeCheckbox = ({ target: { value }}) => {

    const newList = languages.map((item) => {
      if (value === item.language) {
        item.checked = item.checked ? false : true;
      }
      return item;
    })
    setLanguages(newList);
    setValue(value);
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

  const clearFields = () => {
    setFullname('');
    setHomePhone('');
    setCellPhone('');
    setAddress(initialAddress);
    setdisabledExcludButton(true)
    getListLanguages();
    setValue('');
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
      <DivAddress className="div-address" key={address.id}>
        <div className="cep-state-city">
          <Input
            type="text"
            placeholder="CEP"
            id="input-cep"
            name="cep"
            value={ address.cep }
            key='0'
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
            key='1'
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
            key='2'
            onChange={ handleChangeAddress }
          />
          <Input
            type="text"
            placeholder="RUA"
            id="input-street"
            name="street"
            value={ address.street }
            key='3'
            onChange={ handleChangeAddress }
          />
          <Input
            type="text"
            placeholder="NUMERO"
            id="input-number"
            name="number"
            value={ address.number }
            key='4'
            onChange={ handleChangeAddress }
          />
        </div>        
        <Input
          type="text"
          placeholder="COMPLEMENTO"
          id="input-complement"
          name="complement"
          value={ address.complement }
          key='5'
          onChange={ handleChangeAddress }
        /> 
      </DivAddress>
      <DivLanguages>
        { languages.map(({ id, language, checked }, index) => (
          <div key={ index } className="checkbox">
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
          </div>
        ))}          
      </DivLanguages>
      <Input
        type="text"
        placeholder="Outras Linguagens? "
        id="input-other"
      /> 
      <ContainerButtons>
        <Button type="button" onClick={ register } >CADASTRO</Button> 
        <Button type="button" onClick={ removeUser } disabled={ disabledExcludButton } >EXCLUIR</Button>
        <Button type="button" onClick={ changeUser } >ALTERAR</Button>    
      </ContainerButtons>
    </DivForm>
  );
}

export default Form;