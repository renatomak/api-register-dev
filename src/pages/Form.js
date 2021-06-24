import React from 'react';
import { Container, DivForm, DivTelephone, DivAddress, Input, DivSpecialties, Button } from './styled';

function Form() {
  return(
    <Container>
      <DivForm>
        <Input type="text" placeholder="NOME" id="input-name-user" />
        <DivTelephone>
          <Input type="text" placeholder="TELEFONE FIXO" id="input-home-phone" />
          <Input type="text" placeholder="TELEFONE CELULAR" id="input-cell-phone" />
        </DivTelephone>

        <DivAddress>
          <div className="cep-state-city">
            <Input type="text" placeholder="CEP" id="input-cep" />
            <Input type="text" placeholder="ESTADO" id="input-state" />
            <Input type="text" placeholder="CIDADE" id="input-city" />
          </div>

          <div className="district-street-number">
            <Input type="text" placeholder="BAIRRO" id="input-district" />
            <Input type="text" placeholder="RUA" id="input-street" />
            <Input type="text" placeholder="NUMERO" id="input-number" />
          </div>        
          <Input type="text" placeholder="COMPLEMENTO" id="input-complement" /> 
        </DivAddress>
        <DivSpecialties>
          <input type="checkbox" name="language1" />
          <label for="languageUm" >JAVA</label>
          <input type="checkbox" name="language2" />
          <label for="languageUm" >PYTHON</label>
          <input type="checkbox" name="language3" />
          <label for="languageUm" >JAVASCRIPT</label>
          <input type="checkbox" name="language4" />
          <label for="languageUm" >GOLANG</label>
          <input type="checkbox" name="language5" />
          <label for="languageUm" >CSHARP</label>
          <input type="checkbox" name="language6" />
          <label for="languageUm" >ELIXIR</label>
          
        </DivSpecialties>
        <Input type="text" placeholder="Outras Linguagens? " id="input-other" /> 
        <Button>CADASTRO</Button> 
      </DivForm>
  </Container>
  );
}

export default Form;