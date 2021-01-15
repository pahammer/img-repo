import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  margin-top: 10px;
`;

export const Group = styled.div`
  flex: 100%;

  @media (max-width: 700px) {
    flex: 100%;
  }
`;

export const Item = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 300px;
  border-radius: 3px;
  height: auto;
  padding: 30px;
  margin: 15px;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  &:hover {
    transform: scale(1.05);
    z-index: 99;

    h1 {
      visibility: visible;
    }
  }

  @media (max-width: 700px) {
    max-width: 300px;
  }

  h1{
    visibility: hidden;
  }

`;

export const SourceTitle = styled.h1`
  font-size: 15px;
  font-weight: 300;
`;

export const Image = styled.img`
  width: 100%;
`;