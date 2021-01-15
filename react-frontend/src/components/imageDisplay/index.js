import React from 'react';

import {
    Container,
    Group,
    Image,
    Item,
    SourceTitle
} from './styles/imageDisplay';

export default function ImageDisplay({ children, ...restProps }) {

    return (
        <Container {...restProps}>{children}</Container>
    );
}

ImageDisplay.Group = function ImageDisplayGroup({ children, ...restProps }) {
    return <Group {...restProps}>{children}</Group>;
};

ImageDisplay.Item = function ImageDisplayItem({ children, item, ...restProps }){

    return (
        <Item {...restProps}>
            <Image src={item.img_location} />
            <SourceTitle>Image by {item.source}</SourceTitle>
            {children}
        </Item>
    )
};