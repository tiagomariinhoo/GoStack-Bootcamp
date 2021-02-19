import React from 'react'
import { Container, LoginContainer, ButtonContainer } from './styles'
import { Box, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Main: React.FC = () => {
    const history = useHistory()

    const handleLinkToGithubApi = () => {
        history.push('/github')
    }

    const handleLinkToFacebookLayout = () => {
        history.push('/facebook')
    }

    return (
        <Container>
            <LoginContainer>
                <h1>API COMPILATION</h1>
                <span style={{marginBottom: 30, fontSize: 13}}>This website is just to test api calls</span>
                <ButtonContainer>
                    <Button onClick={handleLinkToGithubApi}>Github API</Button>
                    <Button onClick={handleLinkToFacebookLayout}>Facebook API</Button>
                    <Button disabled={true}>Google API</Button>
                </ButtonContainer>
            </LoginContainer>
        </Container>
    )
}

export default Main