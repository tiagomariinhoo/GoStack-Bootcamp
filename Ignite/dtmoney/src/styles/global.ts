import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root { //Css variables
        --background: #f0f2f5;
        --red: #e52e4d;
        --green: #33cc95;
        --blue: #5429cc;

        --blue-light: #6933ff;

        --text-title: #363f5f;
        --text-body: #969cb3;

        --background: #f0f2f5;
        --shape: #ffffff;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    // font-size: 16px (Desktop)
    html {
        // When the user is on a screen up to 1080px wide
        // The font size will decrease
        @media (max-width: 1080px) {
            font-size: 93.75%; // 15px
        }

        // Its necessary use this because in small devices
        // the font-size will be smaller
        @media (max-width: 720px) {
            font-size: 87.5%; // 14px
        } // Its better use % instead directly 14px because
        // if the user has the option to change the font-size
        // in your own device, the screen will adjust better

        //REM = 1rem = font-size
        // The rem adjust the size according the font-size
        // when the font-size decrease, the rem will adjust
        // This is a good practice to adapting the responsive layout

    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    // Every disabled component
    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
`