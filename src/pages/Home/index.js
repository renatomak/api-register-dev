import React from 'react';
import Form from '../components/Formulario';
import ListUsers from '../components/ListUser'
import { Container } from './styled';

function Home() {

  return(
    <Container>
      <ListUsers />
      <Form />
    </Container>
  );
}

export default Home;