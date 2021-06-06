import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import authService from './api-authorization/AuthorizeService'

export class addPokoj extends Component {
    static displayName = addPokoj.name;

    constructor(props) {
        super(props);
        this.state = { nrPokoju: '', nazwaPokoju: '', ileOsobPokoju: '', cenaPokoju: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.nrPokojuInput = React.createRef();
        this.nazwaPokojuInput = React.createRef();
        this.ileOsobPokojuInput = React.createRef();
        this.cenaPokojuInput = React.createRef();

    }

    handleChange(event) {
        this.setState({
            nrPokoju: this.nrPokojuInput.current.value,
            nazwaPokoju: this.nazwaPokojuInput.current.value,
            ileOsobPokoju: this.ileOsobPokojuInput.current.value,
            cenaPokoju: this.cenaPokojuInput.current.value
        });
    }

    handleSubmit(event) {
        alert('Dodano pokoj: ' + this.state.nazwaPokoju);
        event.preventDefault();
        this.postData();
    }

    async postData() {
        const token = await authService.getAccessToken();

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const Pokoj = {  //obiekt do przesłania
            'Id': 'brak',
            'nr_pokoju': parseInt(this.state.nrPokoju, 10),
            'nazwa': this.state.nazwaPokoju,
            'ile_osob': parseInt(this.state.ileOsobPokoju, 10),
            'cena': parseInt(this.state.cenaPokoju, 10)
        }

        axios({
            method: 'post', //metoda przesłania z axios
            url: `https://localhost:44334/pokoj`, //adres do przesłania
            headers: { Authorization: `Bearer ${token}` },
            data: Pokoj //dane do przesłania
        }).then(
            window.location.replace('https://localhost:44334/pokoj')
        );

    }


    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>
                        Nr. pokoju:
                        <Form.Control type="text" name="nr_pokoju" value={this.state.nrPokoju} ref={this.nrPokojuInput} onChange={this.handleChange}/>
                    </Form.Label><br />
                    <Form.Label>
                        Nazwa:
                        <Form.Control type="text" name="nazwa" value={this.state.nazwaPokoju} ref={this.nazwaPokojuInput} onChange={this.handleChange} />
                    </Form.Label><br />
                    <Form.Label>
                        Ile osób:
                        <Form.Control type="text" name="ile_osob" value={this.state.ileOsobPokoju} ref={this.ileOsobPokojuInput} onChange={this.handleChange}/>
                    </Form.Label><br />
                    <Form.Label>
                        Cena:
                        <Form.Control type="text" name="cena" value={this.state.cenaPokoju} ref={this.cenaPokojuInput} onChange={this.handleChange}/>
                    </Form.Label><br />
                    <Button variant="primary" type="submit">
                        Wyslij
                     </Button>
                </Form>
            </div>
        );
    }
}