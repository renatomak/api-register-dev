import styled from 'styled-components';

export const Button = styled.button`
  color: var(--dodgerBlue);
  border: none;
  background: white;
  line-height: 40px;
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 20px;
  transition: 0.3s;
  :hover {
    opacity: 0.8;
    background-color: var(--dodgerBlue);
    color: var(--white)
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerButtonsSearch = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    background: none;
  }
  #search {
    margin-left: 20px;
    margin-right: 20px;
  }
`;

export const DivForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const DivTelephone = styled.div`
  display: flex;
  #input-home-phone {
    margin-right: 20px;
  }
`;

export const DivAddress = styled.div`
  display: flex;
  flex-direction: column;
  #input-state, #input-street {
    margin-left: 20px;
    margin-right: 20px;
  }
  #input-number {
    width: 100px;
  }
  .cep-state-city, .district-street-number {
    display: flex;
  }
`;

export const DivSpecialties = styled.div`
  display: flex;
  background-color: #2b8bb1;
  height: 50px;
  border-radius: 20px;
  align-items: center;
  *{
    flex-grow: 1;
  }
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 90%;
  display: flex;
  background-color: transparent;
  border: 3px solid var(--lightNavyBlue);
  border-radius: 20px;
  box-sizing: border-box;
  color: black;
  font-size: 18px;
  font-weight: 500;
  line-height: 40px;
  margin-bottom: 20px;
  outline: none;
  padding-left: 20px;
  transition: 0.3s;
  width: 100%;

  :focus {
    border-color: var(--dodgerBlue);
    box-shadow: 0 0 8px 0 var(--dodgerBlue);
    color: var(--dodgerBlue);
  }
  ::placeholder {
    color: var(--dodgerBlue);
  }
`;

