import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import authService from './api-authorization/AuthorizeService'

export class editPokoj extends Component {
    static displayName = editPokoj.name;

    constructor(props) {
        super(props);
        this.state = { pokoj: [] };

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
    //////////////////////////////

    componentDidMount() {
        this.populatePokojData();
    }

    async populatePokojData() {
        const token = await authService.getAccessToken();
        const response = await fetch('pokoj', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ pokoj: data, loading: false });
    }
    //////////////////////////////

    async postData() {
        const token = await authService.getAccessToken();

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const Pokoj = {  //obiekt do przesłania
            'Id': this.state.idPokoju,
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
            window.location.replace('https://localhost:44334/pokoje')
        );

    }


    static renderPokojForm(pokojeList) {
        return (
            pokojeList.map(pokoj =>
                <div key={pokoj.id}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Label>
                            Nr. pokoju:
                        <Form.Control type="text" name="nr_pokoju" value={pokoj.nr_pokoju} ref={this.nrPokojuInput} onChange={this.handleChange} />
                        </Form.Label><br />
                        <Form.Label>
                            Nazwa:
                        <Form.Control type="text" name="nazwa" value={pokoj.nazwa} ref={this.nazwaPokojuInput} onChange={this.handleChange} />
                        </Form.Label><br />
                        <Form.Label>
                            Ile osób:
                        <Form.Control type="text" name="ile_osob" value={pokoj.ile_osob} ref={this.ileOsobPokojuInput} onChange={this.handleChange} />
                        </Form.Label><br />
                        <Form.Label>
                            Cena:
                        <Form.Control type="text" name="cena" value={pokoj.cena} ref={this.cenaPokojuInput} onChange={this.handleChange} />
                        </Form.Label><br />
                        <Button variant="primary" type="submit">
                            Wyslij
                     </Button>
                    </Form>
                </div>)
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : editPokoj.renderPokojForm(this.state.pokoje);

        return (
            <div>
                <h1 id="tabelLabel" >Edytuj pokoj</h1>
                <br />
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}