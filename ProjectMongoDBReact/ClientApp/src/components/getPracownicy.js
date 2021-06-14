import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import authService from './api-authorization/AuthorizeService'
import 'regenerator-runtime/runtime'

export class getPracownicy extends Component {
    static displayName = getPracownicy.name;

    constructor(props) {
        super(props);
        this.state = { name: '', pracownik: [], loading: true, phrase: '' };

        this.onInputchange = this.onInputchange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePhrase = this.handleChangePhrase.bind(this);
    }



    handleSubmit(event) {
        event.preventDefault();
        this.populatePracownicyData();
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleChecked = () => {
        this.setState({ show: !this.state.show });
        console.log(this.state.show);
    }

    handleChangePhrase(event) {
        this.setState({
            phrase: event.target.value
        });
        console.log(this.state.endDate);
    }


    static renderKlienciTable(pracownicyList) {
        return (
            this.toggle_button = [],
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Nazwisko</th>
                        <th>Imie</th>
                        <th>Nr. telefonu</th>
                        <th>E-mail</th>
                        <th>Wiecej</th>
                    </tr>
                </thead>
                <tbody>
                    {pracownicyList.map(pracownik =>
                        <tr key={pracownik.id}>

                            <td>{pracownik.nazwisko}</td>

                            <td>{pracownik.imie}</td>

                            <td>{pracownik.nr_tel}</td>

                            <td>{pracownik.email}</td>

                            <td><a href={'/userData/' + pracownik.email}>Rezerwacje pracownika</a></td>
                        </tr>
                    )}
                </tbody>
            </table>


        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Oczekiwanie na fraze ...</em></p>
            : getPracownicy.renderKlienciTable(this.state.pracownik);

        return (
            <div>
                <h1 id="tabelLabel" >Lista pracownikow</h1>
                <br />

                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>
                        Wpisz fraze:
                    </Form.Label><br />
                    <Form.Control type="text" id="phrase" value={this.state.phrase} onChange={this.handleChangePhrase} />
                    <br />
                    <Button variant="primary" type="submit">
                        Szukaj
                     </Button>
                </Form>

                <br />
                {contents}
            </div>
        );
    }

    async populatePracownicyData() {
        const token = await authService.getAccessToken();

        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);

        this.setState({
            name: user.name
        });

        if (this.state.phrase == '') {
            this.setState({
                phrase: 'brak'
            });
        }

        const response = await fetch('user/GetPracownik/' + this.state.name + '/' + this.state.phrase, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ pracownik: data, loading: false });
    }

}

