import React, { useEffect, useState } from 'react';
import { Container, DivForm, DivTelephone, DivAddress, Input, DivSpecialties, Button } from './styled';
import { fetchCheckedCEP, fetchLanguages, fetchCreateUser } from '../requests'
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

  useEffect( async () => {
    const listLanguages = await fetchLanguages();
    setLanguages(listLanguages)
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
        return {...item, cheked: true}
      }
      return item;
    })
    setLanguages(newList);
  }

  const register = async () => {
    const userLanguages = languages.filter((item) => {
      console.log(item)
      return item.cheked;
    });
    console.log(userLanguages)
    console.log(languages)
    const user = {
      fullname,
      homePhone, 
      cellPhone, 
      address,
      languages: userLanguages
    }
      console.log("USER: ", user);
    await fetchCreateUser(user)
  }

  const search = () => {

  }

  return(
    <Container>
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
          { languages.map(({ id, language }, index) => (
            <>
            <input
              type="checkbox"
              value={ language }
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
          id="input-other" /> 
        <Button type="button" onClick={ register } >CADASTRO</Button> 
        <Button type="button" onClick={ search } >BUSCAR</Button> 
      </DivForm>
  </Container>
  );
}

export default Form;