import styled from 'styled-components';

export const ContainerButtonsSearch = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  button {
    border: none;
    background: none;
  }
  #search {
    margin-left: 20px;
    margin-right: 20px;
  }
  select {
    margin-left: 10px;
    height: 50px;
    border-radius: 20px;
    width: 200px;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .seach {
    font-size: 1.5rem;
    color: var(--modifyGray);
  }
`;