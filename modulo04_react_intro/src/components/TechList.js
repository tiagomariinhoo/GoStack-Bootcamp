import React, { Component } from 'react';

import TechItem from './TechItem';

class TechList extends Component {
    // Estado do componente
    // Todo estado é imutável
    state = {
        newTech: '',
        techs: []
    };

    // Executado assim que o componente aparece em tela
    componentDidMount() {
        const techs = localStorage.getItem('techs');

        if (techs) {
            this.setState({
                techs: JSON.parse(techs)
            });
        }
    }

    // Executado sempre que houver alterações nas props ou estado
    componentDidUpdate(prevProps, prevState) {
        // Recebe como parametro os props e estados antigos
        // Então pode utilizar eles para comparar algo
        // Tem acesso ao que foi alterado através de this.props
        // ou this.state para os estados
        if (prevState.techs != this.state.techs) {
            // Banco de dados local do navegador
            localStorage.setItem('techs', JSON.stringify(this.state.techs))
        }
    }

    // Executado quando o componente deixa de existir
    componentWillUnmount() {
        
    }

    // Se não for escrita no formato de arrow function
    // Não tem acesso ao THIS, então não tem acesso
    // a outras propriedades da classe
    handleInputChange = e => {
        // console.log(e.target.value)
        this.props.tech
        this.setState({ newTech: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.newTech);

        // ...this.state.techs copia tudo que tem nesse array
        this.setState({
             techs: [...this.state.techs, this.state.newTech],
             newTech: '',
         });
    }

    handleDelete = (tech) => {
        this.setState({
            techs: this.state.techs.filter(t => t != tech)
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            {/* <h1> {this.state.newTech} </h1> */}
                <ul>
                {this.state.techs.map(tech => (
                <TechItem 
                    key={tech} 
                    tech={tech} 
                    onDelete={() => this.handleDelete(tech)}
                ></TechItem>))}
                </ul>
                <input 
                    type="text" 
                    onChange={this.handleInputChange} 
                    value={this.state.newTech}
                />
                <button type="submit">Enviar</button>
            </form>
        );
    }
}

export default TechList;