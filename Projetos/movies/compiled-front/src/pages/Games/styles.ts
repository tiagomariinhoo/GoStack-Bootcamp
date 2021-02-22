import styled from 'styled-components'

export const Container = styled.div`
    min-height: 100vh;
    background: ${props => props.theme.colors.background};
`

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding-top: 10px;
`

export const CardContainer = styled.div`
    display: flex;
    margin: 15px;
    flex-wrap: wrap;
    width: 960px;

    .MuiPaper-root {
        margin: 10px;
    }
`