import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  width: 80%;
  flex-direction: row;
  margin-bottom: 100px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 700px) {
    margin-bottom: 40px;
  }
`;

export const Logo = styled.img`
  height: 200px;

  @media (max-width: 700px) {
    height: 150px;
  }
`;