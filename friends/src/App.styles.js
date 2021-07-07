import { Button as ButtonBase } from 'rebass';
import styled from 'styled-components';

export const Container = styled.div`
    width: 89%;
    max-width: 800px;
    min-height: 100vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #232323;
`;

export const StyledForm = styled.form`
    input {
        padding: 1rem;
        border-radius: 8px;
        border: 2px solid magenta;
        text-align: center;
        font-weight: 600;
        outline: transparent;
    }
`;

export const Button = styled(ButtonBase)`
    outline: transparent;
    cursor: pointer;
    &:hover {
        border: 1px solid magenta;
        color: magenta;
        background-color: transparent;
    }
`;
