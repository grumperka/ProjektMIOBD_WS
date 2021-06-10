﻿import React, { Component, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import authService from './api-authorization/AuthorizeService'
import 'regenerator-runtime/runtime'

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
        }).then(
            window.location.replace('https://localhost:44334/getRezerwacje')
        ).catch(error => {
            console.log("Wystapil blad. Wybierz inna date.");
        }
        );

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
                <h1 id="tabelLabel" >Zarezerwuj pokoj</h1>

                <br />
                <p>Dane rezerwowanego pokoju</p>
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
