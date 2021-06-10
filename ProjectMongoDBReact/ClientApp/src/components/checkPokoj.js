import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import authService from './api-authorization/AuthorizeService'
import 'regenerator-runtime/runtime'

export class checkPokoj extends Component {
    static displayName = checkPokoj.name;

    constructor(props) {
        super(props);
        this.state = { pokoje: [], startDate: new Date(), endDate: new Date(), loading: true, show: false };

        this.onInputchange = this.onInputchange.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeStart(event) {
        this.setState({
            startDate: event.target.value
        });
        console.log(this.state.startDate);
    }

    handleChangeEnd(event) {
        this.setState({
            endDate: event.target.value
        });
        console.log(this.state.endDate);
    }

    handleChange(event) {
        this.setState({
            ileOsob: this.ileOsobPokojuInput.current.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.populatePokojData();
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }



    static renderPokojeTable(pokojeList) {
        return (
            this.toggle_button = [],
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Nr. pokoju</th>
                        <th>Nazwa</th>
                        <th>Ile osob</th>
                        <th>Cena</th>
                        <th>Rezerwacja</th>
                    </tr>
                </thead>
                <tbody>
                    {pokojeList.map(pokoj =>
                        <tr key={pokoj.id}>

                            <td>{pokoj.nr_pokoju}</td>

                            <td><a href={'/pokojDetails/' + pokoj.id}>{pokoj.nazwa}</a></td>

                            <td>{pokoj.ile_osob}</td>

                            <td>{pokoj.cena}</td>

                            <td><Button variant="outline-success" href={'/addRezerwacja/' + pokoj.id}>Zarezerwuj</Button></td>

                        </tr>
                    )}
                </tbody>
            </table>


        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Brak wolnych pokoi.</em></p>
            : checkPokoj.renderPokojeTable(this.state.pokoje);

        return (
            <div>
                <h1 id="tabelLabel" >Wolne pokoje</h1>
                <br />
                <div>

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Label>
                            Data rozpoczecia:
                    </Form.Label><br />
                        <Form.Control type="date" id="startInput" value={this.state.startDate} onChange={this.handleChangeStart} /><br /><br />
                        <Form.Label>
                            Data zakonczenia:
                    </Form.Label><br />
                        <Form.Control type="date" id="endInput" value={this.state.endDate} onChange={this.handleChangeEnd} /><br />
                        <br />
                        <Button variant="primary" type="submit">
                            Szukaj
                     </Button>
                    </Form>

                    </div>
                <br />
                <br />
                {contents}
            </div>
        );
    }

    async populatePokojData() {
        const token = await authService.getAccessToken();

        const response = await fetch('pokoj/getVacancy/' + this.state.startDate + "/" + this.state.endDate, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ pokoje: data, loading: false });
    }

}

