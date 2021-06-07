import React, { Component, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import authService from './api-authorization/AuthorizeService'
import 'regenerator-runtime/runtime'
import { User } from 'oidc-client';



export class addRezerwacja extends Component {
    static displayName = addRezerwacja.name;

    constructor(props) {
        super(props);
        this.state = { id: props.match.params.id, pokoj: '', startDate: new Date(), endDate: new Date(), loading: true};

        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
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

    handleSubmit(event) {
        //alert('Dodano rezerwacje: ' + this.state.startDate);
        event.preventDefault();
        this.postData();
    }

    async postData() {
        const token = await authService.getAccessToken();

        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);

        let userName = user.name;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const Rezerwacja = {  //obiekt do przesłania
            'Id': 'brak',
            'id_pokoju': this.state.id,
            'id_klienta': 'brak',
            'id_rezerwujacego': userName,
            'poczatek': this.state.startDate,
            'koniec': this.state.endDate,
            'koszt': parseInt(this.state.cena, 10),
            'czyEdytowana': false,
            'dataEdycji': new Date(),
            'czyAnulowana': false,
        }

        axios({
            method: 'post', //metoda przesłania z axios
            url: `https://localhost:44334/rezerwacja`, //adres do przesłania
            headers: { Authorization: `Bearer ${token}` },
            data: Rezerwacja //dane do przesłania
        }).catch(error => {
            console.log(error.response.data);
           });

    }

    componentDidMount() {
        this.populatePokojData();
    }

    static renderPokoj(id, nrPokoju, nazwa, ile_osob, cena) {
        return (
            <div>
                <Form >
                    <Form.Label>
                        Nr. pokoju: <b>{nrPokoju}</b><br />
                        Nazwa: <b>{nazwa}</b><br />
                        Ile osob: <b>{ile_osob}</b><br />
                        Cena za 24h: <b>{cena}</b><br />
                    </Form.Label><br /><br />
                </Form>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : addRezerwacja.renderPokoj(this.state.id, this.state.nrPokoju, this.state.nazwa, this.state.ile_osob, this.state.cena);

        return (
            <div>
                <h1 id="tabelLabel" >Lista pokoi</h1>
                <Button variant="success" href="/addPokoj">
                    Dodaj pokoj
                </Button>
                <br /><br />
                <Button onClick={this.handleChecked}> Modul edycyjny
                </Button>

                <br />
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Label>
                            Data rozpoczecia:
                    </Form.Label><br />
                        <Form.Control type="date" id="startInput" value={this.state.startDate} onChange={this.handleChangeStart} /><br /><br />
                        <Form.Label>
                            Data zakonczenia:
                    </Form.Label><br />
                        <Form.Control type="date" id="endInput" value={this.state.endDate} onChange={this.handleChangeEnd} /><br /><br />
                        <Button variant="primary" type="submit">
                            Rezerwuj
                     </Button>
                    </Form>

                </div>
            </div>
        );
    }

    async populatePokojData() {
        const token = await authService.getAccessToken();

        axios.get(`/pokoj/GetPokoj/` + this.state.id,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                this.setState({
                    nrPokoju: response.data.nr_pokoju,
                    nazwa: response.data.nazwa,
                    ile_osob: response.data.ile_osob,
                    cena: response.data.cena,
                    loading: false
                });
            }).catch(function (error) {
                console.log(error);
            });

    }

}
////////////////////////////////
const deletePokoj = (event) => {
    let a = deleteData(event.target.value);
}

async function deleteData(idPokoj) {
    const token = await authService.getAccessToken();

    axios.delete(`/pokoj/Delete/` + idPokoj,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                'id': idPokoj
            }

        }).then(window.location.reload());



    return 0;
}
////////////////////////////////////
const editPokoj = (event) => {
    let e = editData(event.target.value);
}

async function editData(idPokoj) {
    const nrPokoju = document.getElementById(idPokoj + '_nr_pokoju').value;
    const nazwa = document.getElementById(idPokoj + '_nazwa').value;
    const ile_osob = document.getElementById(idPokoj + '_ile_osob').value;
    const cena = document.getElementById(idPokoj + '_cena').value;


    const PokojM = {  //obiekt do przesłania
        'Id': idPokoj,
        'nr_pokoju': parseInt(nrPokoju, 10),
        'nazwa': nazwa,
        'ile_osob': parseInt(ile_osob, 10),
        'cena': parseInt(cena, 10)
    }

    const token = await authService.getAccessToken();

    const data = {
        id: idPokoj,
        Pokoj: PokojM
    };

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    axios.put(`/pokoj/Put/` + idPokoj,
        { 'id': idPokoj, 'nr_pokoju': PokojM.nr_pokoju, 'nazwa': PokojM.nazwa, 'ile_osob': PokojM.ile_osob, 'cena': PokojM.cena },
        { headers }).catch(error => console.log(error));

    return 0;
}

