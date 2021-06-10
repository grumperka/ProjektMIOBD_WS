import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import authService from './api-authorization/AuthorizeService'
import 'regenerator-runtime/runtime'

export class pokojDetails extends Component {
    static displayName = pokojDetails.name;

    constructor(props) {
        super(props);
        this.state = { id: props.match.params.id ,pokoj: '', loading: true, show: false };

        this.onInputchange = this.onInputchange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }


    componentDidMount() {
        this.populatePokojData();
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


    static renderPokoj(id,nrPokoju,nazwa,ile_osob,cena,showM) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Nr. pokoju</th>
                        <th>Nazwa</th>
                        <th>Ile osob</th>
                        <th>Cena</th>
                        <th style={showM === false ? { display: 'none' } : {}}>Edytuj</th>
                        <th style={showM === false ? { display: 'none' } : {}}>Usun</th>
                        <th style={showM === true ? { display: 'none' } : {}}>Rezerwacja</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={id}>

                        {showM === true ?
                        <td> <input type="text" id={id + '_nr_pokoju'} defaultValue={nrPokoju} onChange={this.onInputchange} style={{ background_color: "inherit", border: "0" }} /> </td>
                            : <td>{nrPokoju}</td>}

                        {showM === true ?
                            <td><input type="text" id={id + '_nazwa'} defaultValue={nazwa} style={{ background_color: "inherit", border: "0" }} /></td>
                            : <td>{nazwa}</td>}

                        {showM === true ?
                            <td><input type="text" id={id + '_ile_osob'} defaultValue={ile_osob} style={{ background_color: "inherit", border: "0" }} /></td>
                            : <td>{ile_osob}</td>}

                            {showM === true ?
                            <td><input type="text" id={id + '_cena'} defaultValue={cena} style={{ background_color: "inherit", border: "0" }} /></td>
                            : <td>{cena}</td>}

                        <td style={showM === false ? { display: 'none' } : {}}><Button variant="outline-warning" size="sm" value={id} onClick={editPokoj}>Edytuj</Button></td>
                        <td style={showM === false ? { display: 'none' } : {}}><Button variant="outline-danger" size="sm" value={id} onClick={deletePokoj}>Usun</Button></td>


                        <td style={showM === true ? { display: 'none' } : {}}><Button variant="outline-success" href={'/addRezerwacja/' + id}>Zarezerwuj</Button></td>

                        </tr>
                </tbody>
            </table>


        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Ladowanie tresci...</em></p>
            : pokojDetails.renderPokoj(this.state.id, this.state.nrPokoju, this.state.nazwa, this.state.ile_osob, this.state.cena, this.state.show);

        return (
            <div>
                <h1 id="tabelLabel" >Lista pokoi</h1>
                <Button variant="success" href="/addPokoj">
                    Dodaj pokoj
                </Button>
                <br /><br />
                <Button onClick={this.handleChecked}> Modul edycyjny
                </Button>
                <br /><br />
                {contents}
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

    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);


    axios.delete(`/pokoj/Delete/` + idPokoj + '/' + user.name,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                'id': idPokoj,
                'userName': user.name
            }

        }).then(
            window.location.replace('https://localhost:44334/pokoje')
        );



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

    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);

    const data = {
        id: idPokoj,
        Pokoj: PokojM
    };

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    axios.put(`/pokoj/Put/` + idPokoj + '/' + user.name,
        { 'id': idPokoj, 'nr_pokoju': PokojM.nr_pokoju, 'nazwa': PokojM.nazwa, 'ile_osob': PokojM.ile_osob, 'cena': PokojM.cena, 'userName': user.name },
        { headers }).then(window.location.reload()).catch (error => console.log(error));

    return 0;
}

