import React from 'react';

import { 
    Container,
    Button,
    ModalComponent,
    ModalBox,
    ModalButton,
    ModalMain,
    UploadButtonWrapper,
    UploadFormContainer,
    Input,
    Text,
    LabelContainer,
    Checkbox,
    Loading
 } from './styles/modal';

export default function Modal({ children, ...restProps }) {

    return (
        <Container {...restProps}>
            {children}
        </Container>
    );
};

Modal.Button = function ModalButton({ children, ...restProps }) {

    return (
        <Button {...restProps}>
            {children}
        </Button>
    );
};

Modal.ModalComponent = function ModalModalComponent({ children, ...restProps }) {

    return (
        <ModalComponent {...restProps}>
            <ModalBox>
                    {children}
            </ModalBox>
        </ModalComponent>
    )
};

Modal.ModalClose = function ModalModalClose({ children, ...restProps }) {

    return (
        <ModalButton {...restProps}>{children}</ModalButton>
    )
};

Modal.ModalMain = function ModalModalMain({ children, ...restProps }) {

    return (
        <ModalMain {...restProps}>{children}</ModalMain>
    );
};

Modal.UploadFormContainer = function ModalUploadFormContainer({ children, ...restProps }){
    return <UploadFormContainer {...restProps}>{children}</UploadFormContainer>;
};

Modal.ModalButton = function ModalModalButton({ children, ...restProps }) {
    
    return (
        <UploadButtonWrapper {...restProps}>
            Select Image {children}
        </UploadButtonWrapper>
    );
};

Modal.Submit = function ModalSubmit({ children, ...restProps }){
    return <Button {...restProps}>{children}</Button>;
};

Modal.UploadFormContainer = function ModalUploadFormContainer({ children, ...restProps }){
    return <UploadFormContainer {...restProps}>{children}</UploadFormContainer>;
};

Modal.Input = function ModalInput({ children, placeholder, ...restProps }){
    return <Input {...restProps}
            placeholder={placeholder}>{children}</Input>;
};

Modal.Text = function ModalText({ children, ...restProps }){
    return <Text {...restProps}>{children}</Text>;
};

Modal.CheckboxField = function ModalCheckboxField({ children, ...restProps }) {
    return (
        <>
            <LabelContainer {...restProps}>{children}
                <Checkbox type="checkbox" />
            </LabelContainer>
        </>
    );
}

Modal.Loading = function ModalLoading({ children, ...restProps }){
    return <Loading {...restProps}>{children}</Loading>;
};