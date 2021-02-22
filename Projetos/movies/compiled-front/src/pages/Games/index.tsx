import { AppBar, Toolbar, Switch, TextField, Button } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { ThemeContext } from '../../Provider/ThemeProvider'
import { CardContainer, Container, MainContainer } from './styles'
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import GTAPoster from '../../assets/Games/GTAVPoster.jpg'
import SFVPoster from '../../assets/Games/SFVPoster.jpg'
import { useFetch } from '../../hooks/useSWR'

import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

/**
 * Todo: 
 * Separate card in component
 * Get data fetch and use the cards to show
 * add pagination
 */

const CustomTextField = styled(TextField)`
    width: 500px;
`

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const Games: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    // const { data, error } = useFetch('/repos')

    const classes = useStyles();
    const [filter, setFilter] = useState('')


    const CustomCard = () => (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
            </CardContent>
        </Card>

    )

    return (
        <Container>
            <AppBar position='static'>
                <Toolbar variant='dense' style={{ background: theme.colors.primary }}>
                    <div>
                        Dark theme:
                            <Switch onChange={toggleTheme} />
                    </div>
                </Toolbar>
            </AppBar>
            <MainContainer>
                <Carousel autoPlay={true} showStatus={false} width={800} showThumbs={false} infiniteLoop={true}>
                    <img src={GTAPoster} alt="" />
                    <img src={SFVPoster} alt="" />
                    <img src={GTAPoster} alt="" />
                    <img src={SFVPoster} alt="" />
                </Carousel>

                <div style={{ display: 'flex', marginTop: 15 }}>
                    <CustomTextField
                        id="outlined-basic"
                        label="Filtrar por usuário"
                        variant="outlined"
                        onChange={(e) => { setFilter(e.target.value) }}
                    />

                    <Button
                        onClick={() => {console.log(filter)}}
                        style={{ marginLeft: 15, color: '#fff', background: theme.colors.primary }}>Filtrar</Button>

                </div>
                <CardContainer>
                    <CustomCard />
                    <CustomCard />
                    <CustomCard />
                    <CustomCard />
                    <CustomCard />
                </CardContainer>
            </MainContainer>
        </Container>
    )
}

export default Games
