import React from 'react';
import styled from 'styled-components';

const RowBox = ({ children, style }) => {
    return <Container style={style}>{children}</Container>;
};
const Container = styled.div`
    display: flex;
`;
export default RowBox;
