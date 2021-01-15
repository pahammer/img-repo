import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  width: 80%;
  flex-direction: row-reverse;
  margin-bottom: 100px;

  @media (max-width: 700px) {
    margin-bottom: 40px;
  }
`;

export const Button = styled.button`
  box-shadow: 0 0.6vw 1vw -0.4vw rgba(0, 0, 0, 0.35);
  max-height: 40px;
  background-color: #fff;
  color: #000;
  border-width: 0;
  padding: 5px 10px;
  margin-bottom: 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #FF832B;
    color: white;
  }
`;

export const ModalComponent = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

export const ModalBox = styled.section`
  position:fixed;
  background: white;
  width: 78%;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 5px 10px;
  border-radius: 8px;
  box-shadow: 0 0.6vw 1vw -0.4vw rgba(0, 0, 0, 0.35);
  min-height: 200px;
  text-align: right;

  @media (max-width: 700px) {
    margin-bottom: 40px;
  }
`;

export const ModalButton = styled.button`
  text-align: right;
  background-color: transparent;
  color: #000;
  border-width: 0;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;

  img {
    width: 50%;
  }
`;

export const ModalMain = styled.div`
  width: 100%;
  text-align: center;
  color: #000;
`;

export const UploadButtonWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  border: 2px solid gray;
  color: gray;
  padding 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  font-size: 20px;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #282c34;
    color: white;
  }

  input {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }

`;

export const UploadFormContainer = styled.div`
  display: flex;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 700px) {
    margin-bottom: 40px;
  }

`;

export const Input = styled.input`
  display: inline;
  background-color: transparent;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  height: 40px;
  line-height: 40px;
  padding-top: 20px;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 30px;
  }
`;

export const Text = styled.h3`
  color: ${({ color }) => (color === 'error' ? '#FF0000' : '#282c34')}; 
  font-size: 18px;
  font-weight: 400;
`;

export const Checkbox = styled.input`
`;

export const LabelContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding-bottom: 20px;
`;

export const Loading = styled.div`

  img {
      width: 10%;
  }

`;
