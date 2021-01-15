import React from 'react';

import { Container, Input, Submit } from './styles/search';

export default function Search({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
  }
  
Search.Input = function SearchInput({ searchTerm, setSearchTerm, ...restProps }) {
    
    return <Input {...restProps}
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
            placeholder="Search for images by tag (e.g. red, cat)"
            data-testid="search-input"
        />;
};

Search.Submit = function SearchSubmit({ src, ...restProps }) {
    return <Submit {...restProps}><img src={src} alt="search" /></Submit>;
};