import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    background: #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const MainContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: -200px;
`

export const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 450px;
    margin-right: 120px;
    margin-top: -100px;

    > img {
        width: 300px;
        margin-left: -30px;
    }
    > h1 {
        font-family: SFProDisplay-Regular, Helvetica, Arial, sans-serif;
        font-size: 28px;
        font-weight: normal;
    }
`

export const LoginContainer = styled.div`
    width: 380px;
    display: flex;
    padding: 15px;
    border-radius: 7px;
    background-color: #fff;
    flex-direction: column;
    box-shadow: 0 4px 10px rgba(0,0,0,0.25), 0 1px 1px rgba(0,0,0,0.22);
    align-items: center;

`

export const FooterContainer = styled.div`
    position: absolute;
    bottom: 0px;
    height: 20vh;
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding-left: 480px;
    line-height: 20px;

    > span {
        word-spacing: 15px;
        font-size: 11px;
        color: #8a8d91;
    }

    > span:first-child {
        margin-top: 30px;
    }
`