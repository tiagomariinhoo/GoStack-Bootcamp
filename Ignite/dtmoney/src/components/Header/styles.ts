import styled from 'styled-components'

export const Container = styled.header`
    background: var(--blue);
`

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto; //This will keep the container on center

    padding: 2rem 1rem 12rem; //1rem == font-size
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        font-size: 1rem;
        color: #fff;
        background: var(--blue-light);
        border: 0;
        padding: 0 2rem;
        border-radius: 0.25rem;
        height: 3rem;

        //Always that the filter is changed, the filter will get 0.2 transition
        transition: filter 0.2s;

        &:hover {
            //We can use this filter to change the color when hover, for example
            filter: brightness(0.9)
        }
    }
`