import React from 'react';
import Form from '../components/Formulario';
import ListUsers from '../components/ListUser'
import { Container, H1} from './styled';

function Home() {

  return(
    <>
    <H1>Cadastro de Desenvolvedores</H1>
    <Container>
      <ListUsers />
      <Form />
    </Container>
    </>
  );
}

export default Home;