import React, { useState, useContext } from 'react';
import { ContainerButtonsSearch } from './styled';
import imgSearch from '../../images/search_2908.png';
import arrowLeft from '../../images/arrow_left.png';
import arrowRight from '../../images/arrow_right.png';
import { fetchUser } from '../../../requests'
import { Context } from '../../../util';

function Search() {
  const { setSelectedUser, listUsers, valueSearch, setListUsers } = useContext(Context);
  const [optionSearch, setOptionSearch] = useState({});
  const [position, setPosition] = useState(0);

  
  /* query = { field: 'street', value: 'Av.', table: 'Addresses' }; */
  const typeSearch = ({ target: { value }}) => {
    const array = value.split(' ');
    const query = { field: array[1], table: array[0] };
    
    console.log(query)

    setOptionSearch(query);
  }

  const search = async () => {
    const query = {...optionSearch, value: valueSearch }

    console.log(query)
    const result = await fetchUser(query);
    setListUsers(result);
    setSelectedUser(result[0]);

    console.log(result);
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

  return(
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

          <div>
          <label for="type-search">Fazer busca por:</label>
            <select id="options" onChange={ typeSearch }>
              <option> - </option>
              <optgroup label="Usuário">
                <option value="User fullname" name="User">Nome</option>
                <option value="User homePhone" name="User">Telefone Fixo</option>
                <option value="User cellPhone" name="User">Celular</option>
              </optgroup>
              <optgroup label="Endereço">
                <option value="Addresses cep" name="Addresses">CEP</option>
                <option value="Addresses city" name="Addresses">Cidade</option>
                <option value="Addresses complement" name="Addresses">Complemento</option>
                <option value="Addresses district" name="Addresses">Bairro</option>
                <option value="Addresses number" name="Addresses">Numero</option>
                <option value="Addresses state" name="Addresses">Estado</option>
                <option value="Addresses street" name="Addresses">Rua/Avenida</option>
              </optgroup>
              <option value="Language Language" name="Language">Lingagem</option>
            </select>
          </div>
          
        </ContainerButtonsSearch>
  );
}

export default Search;