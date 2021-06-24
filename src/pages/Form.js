import React, { useState } from 'react';
import { Container, DivForm, DivTelephone, DivAddress, Input, DivSpecialties, Button } from './styled';

function Form() {
  const [name, setName] = useState('');
  const [homePhone, setHomePhone] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  const consultaCep = () => {

  }

  const handleChangeHomeName = ({ target: { value } }) => {
    setName(value);
  }
  const handleChangeHomePhone = ({ target: { value } }) => {
    setHomePhone(value);
  }
  const handleChangeCellPhone = ({ target: { value } }) => {
    setCellPhone(value);
  }
  const handleChangeCEP = ({ target: { value } }) => {
    setCep(value);
  }
  const handleChangeState = ({ target: { value } }) => {
    setState(value);
  }
  const handleChangeDistrict = ({ target: { value } }) => {
    setDistrict(value);
  }
  const handleChangeStreet = ({ target: { value } }) => {
    setStreet(value);
  }
  const handleChangeCity = ({ target: { value } }) => {
    setCity(value);
  }
  const handleChangeNumber = ({ target: { value } }) => {
    setNumber(value);
  }
  const handleChangeComplement = ({ target: { value } }) => {
    setComplement(value);
  }
  return(
    <Container>
      <DivForm>
        <Input
          type="text"
          placeholder="NOME"
          id="input-name-user"
          name="name"
          value={ name }
          onChange={ handleChangeHomeName }/>
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
              value={ cep }
              onChange={ handleChangeCEP }
            />
            <Input
              type="text"
              placeholder="ESTADO"
              id="input-state"
              name="state"
              value={ state }
              onChange={ handleChangeState }
            />
            <Input
              type="text"
              placeholder="CIDADE"
              id="input-city"
              name="city"
              value={ city }
              onChange={ handleChangeCity }
            />
          </div>

          <div className="district-street-number">
            <Input
              type="text"
              placeholder="BAIRRO"
              id="input-district"
              name="district"
              value={ district }
              onChange={ handleChangeDistrict }
            />
            <Input
              type="text"
              placeholder="RUA"
              id="input-street"
              name="street"
              value={ street }
              onChange={ handleChangeStreet }
            />
            <Input
              type="text"
              placeholder="NUMERO"
              id="input-number"
              name="number"
              value={ number }
              onChange={ handleChangeNumber }
            />
          </div>        
          <Input
            type="text"
            placeholder="COMPLEMENTO"
            id="input-complement"
            name="complement"
            value={ complement }
            onChange={ handleChangeComplement }
          /> 
        </DivAddress>
        <DivSpecialties>
          <input
            type="checkbox"
            name="language1"
          />
          <label for="languageUm" >JAVA</label>
          <input
            type="checkbox"
            name="language2"
          />
          <label for="languageUm" >PYTHON</label>
          <input
            type="checkbox"
            name="language3"
          />
          <label for="languageUm" >JAVASCRIPT</label>
          <input
            type="checkbox"
            name="language4"
          />
          <label for="languageUm" >GOLANG</label>
          <input
            type="checkbox"
            name="language5"
          />
          <label for="languageUm" >CSHARP</label>
          <input
            type="checkbox"
            name="language6"
          />
          <label for="languageUm" >ELIXIR</label>
          
        </DivSpecialties>
        <Input
          type="text"
          placeholder="Outras Linguagens? "
          id="input-other" /> 
        <Button>CADASTRO</Button> 
      </DivForm>
  </Container>
  );
}

export default Form;