import styled from 'styled-components';

export const DivListUsers = styled.form`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  width: 30%;
  line-height: 50px;
  color: #4d4c4c;
  font-size: 2rem;
  height: 100%;

  ul {
    list-style: none;
  }
  li {
    cursor: pointer;
  }
`;

export const H5 = styled.h5`
  margin-top: 50px;
  text-align: center;
  color: var(--dodgerBlue);
`;
