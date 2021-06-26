import React, { useEffect, useState, useContext } from 'react';
import { DivForm, DivTelephone, DivAddress, Input, DivSpecialties, Button } from './styled';
import { fetchCheckedCEP, fetchLanguages, fetchCreateUser, fetchUser, fetchRemoveUser, fetchGetAllUsers } from '../../../requests'
import { TrybeerContext } from '../../../util';
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
  const { selectedUser, setListUsers, setSelectedUser } = useContext(TrybeerContext);
  const [fullname, setFullname] = useState('');
  const [homePhone, setHomePhone] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [address, setAddress] = useState(initialAddress);
  const [languages, setLanguages] = useState([]);


  const consultaCep = async (valueCep) => {
    const {
      cep,
      street,
      complement,
      city,
      district,
      state,
      number } = await fetchCheckedCEP(valueCep);
    setAddress({...address, cep, street, complement, city, district, state, number })
  }

  const updateLanguages = () => {
    const { Languages } = selectedUser;

    const newLanguages = languages.map((item) => {
      if (Languages.some((elem) => elem.id === item.id)) {
        item.cheked = true;
      }
      return item;
    })
    setLanguages(newLanguages)
    console.log(languages)
  }

  const setFields = () => {
    const { id, fullname, cellPhone, homePhone, addresses } = selectedUser;
    console.log(selectedUser)
    console.log(fullname)
    setFullname(fullname);
    setHomePhone(homePhone);
    setCellPhone(cellPhone);
    setAddress(addresses);
    updateLanguages();
  }

  useEffect(() => {
    const size = (Object.keys(selectedUser)).length
    if (size) {
      setFields();
    }
  }, [selectedUser])


  useEffect( async () => {
    const listLanguages = await fetchLanguages();
    setLanguages(listLanguages);
    console.log('passou aqui')
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

  const handleChangeCheckbox = ({ target: { value, checked }}) => {
    console.log(value)
    console.log('checked', checked)
    const newList = languages.map((item) => {
      if (value === item.language) {
        return {...item, cheked: true}
      }
      return item;
    })
    setLanguages(newList);
  }

  const register = async () => {
    const userLanguages = languages.filter((item) => {
      return item.cheked;
    });

    const user = {
      fullname,
      homePhone, 
      cellPhone, 
      address,
      languages: userLanguages
    }

    await fetchCreateUser(user)
  }

  const search = async () => {
    const result = await fetchUser('street', 'Av.', 'table', 'Addresses');
    console.log(result)
  }

  const clearFields = () => {
    setFullname('');
    setHomePhone('');
    setCellPhone('');
    setAddress(initialAddress);
  }

  const removeUser = async () => {
    clearFields();
    await fetchRemoveUser(selectedUser.id);
    const Users = await fetchGetAllUsers();
    setListUsers(Users);
    clearFields();
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
      <Button type="button" onClick={ register } >CADASTRO</Button> 
      <Button type="button" onClick={ search } >BUSCAR</Button> 
      <Button type="button" onClick={ removeUser } >EXCLUIR</Button> 
    </DivForm>
  );
}

export default Form;