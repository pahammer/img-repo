import styled from 'styled-components/macro';

export const Container = styled.div`
`;

export const Input = styled.input`
  display: inline;
  background-color: transparent;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  color: #fff;
  height: 40px;
  line-height: 40px;
  padding: 5px 20px;
  margin-bottom: 20px;
  width: 260px;

  &:last-of-type {
    margin-bottom: 30px;
  }

  @media (max-width: 500px) {
    padding: 5px 10px;
    width: 254px;
  }

`;

export const Submit = styled.button`
  display: inline;
  background: transparent;
  font-weight: bold;
  margin: 0px 0 0px 10px;
  border: 0;
  color: #fff;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }

  img {
      width: 30%;
      filter: invert(1);
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.5);
      }

      @media (max-width: 700px) {
        width: 30%;
        margin: 0px 0 0px 0px;
      }
  }
`;