import React from 'react'
import { Container, FooterContainer, LoginContainer, LogoContainer, MainContainer } from './styles'
import styled from "styled-components";
import FacebookLogo from '../../assets/facebookLogo.svg'
import { Button, TextField, Divider } from '@material-ui/core'

const CustomTextField = styled(TextField)`
    width: 100%;
`

const CustomLoginButton = styled(Button)`
    width: 100%;
`

const FacebookLayout: React.FC = () => {

    return (
        <Container>
            <MainContainer>
                <LogoContainer>
                    <img src={FacebookLogo} />
                    <h1>Connect with friends and the world around you on Facebook.</h1>
                </LogoContainer>

                <LoginContainer>
                    <CustomTextField
                        id="outlined-basic"
                        label="Email or Phone Number"
                        variant="outlined"
                    />

                    <CustomTextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        style={{marginTop: 12}}
                    />

                    <CustomLoginButton
                        style={{borderRadius: '5px', marginTop: 15, padding: 10, backgroundColor: '#1877f2', color: '#fff'}}
                    >Log In</CustomLoginButton>

                    <a style={{textDecoration: 'none', marginTop: 15, fontSize: 12}} href="">Forgot Password?</a>
                    <hr style={{borderTop: '0.5px solid #dadde1', width: '100%', marginTop: 20, marginBottom: 25}}/>
                    <CustomLoginButton
                        style={{borderRadius: '5px', marginBottom: 10, padding: '10px', backgroundColor: '#42b72a', color: '#fff', width: '200px'}}
                    >Create New Account</CustomLoginButton>
                </LoginContainer>
            </MainContainer>
            <FooterContainer>
                <span>English Português Español Français(France) Italiano</span>
                <hr style={{borderTop: '0.5px solid #dadde1', width: '67%', marginTop: 10, marginBottom: 10}}/>
                <span>SignUp LogIn Messenger FacebookLite Watch People Pages PageCategories Places Games Locations Marketplace FacebookPay Groups</span>
                <span>SignUp LogIn Messenger FacebookLite Watch People Pages PageCategories Places Games Locations Marketplace FacebookPay Groups</span>
                <span>Cookies AdCHoices Terms Help</span>
            </FooterContainer>
        </Container>
    )
}

export default FacebookLayout