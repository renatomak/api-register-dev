import React from 'react';
import Form from '../components/Formulario';
import ListUsers from '../components/ListUser'
import Search from '../components/Search'
import { Container, H1, ContainerRight } from './styled';

function Home() {

  return(
    <>
    <H1>Cadastro de Desenvolvedores (as)</H1>
    <Container>
      <ListUsers />
      <ContainerRight>
        <Form />
        <Search /> 
      </ContainerRight>
    </Container>
    </>
  );
}

export default Home;