import styled from 'styled-components'

export const Container = styled.div`
    width: 89%;
    max-width: 800px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #232323;

`

export const StyledForm = styled.form`
    input {
        padding: 1rem;
        border-radius: 8px;
        border: 3px solid magenta;
        text-align: center;
        font-weight: 600;
    }
`