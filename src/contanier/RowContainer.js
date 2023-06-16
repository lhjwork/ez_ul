import React from 'react';
import styled from 'styled-components';

const RowContainer = ({ children, style }) => {
    return <Container style={style}>{children}</Container>;
};
const Container = styled.div`
    display: flex;
    align-items: center;
`;
export default RowContainer;
