import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    `

export const LoginContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    padding: 35px;
    width: 500px;
    height: 500px;
    background-color: #E8F1F2;

    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);


    h1 {

    }
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;

    > button {
        background-color: #000;
        color: #fff;
        margin-top: 10px;
    }
`