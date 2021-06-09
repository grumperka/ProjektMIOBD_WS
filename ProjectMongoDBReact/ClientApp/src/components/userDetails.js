import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import authService from './api-authorization/AuthorizeService'
import 'regenerator-runtime/runtime'

export class userDetails extends Component {
    static displayName = userDetails.name;

    constructor(props) {
        super(props);
        this.state = { email: '', id: '', imie: '', nazwisko: '', nr_tel: '', loading: true, show: false };

        this.onInputchange = this.onInputchange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }


    componentDidMount() {
        this.populateUserData();
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


    static renderUser(id, imie, nazwisko, nr_tel, email, showM) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Imie</th>
                        <th>Nazwisko</th>
                        <th>Nr. telefonu</th>
                        <th>E-mail</th>
                        <th style={showM === false ? { display: 'none' } : {}}>Edytuj</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={id}>

                        {showM === true ?
                            <td> <input type="text" id={id + '_imie'} defaultValue={imie} onChange={this.onInputchange} style={{ background_color: "inherit", border: "0" }} /> </td>
                            : <td>{imie}</td>}

                        {showM === true ?
                            <td><input type="text" id={id + '_nazwisko'} defaultValue={nazwisko} style={{ background_color: "inherit", border: "0" }} /></td>
                            : <td>{nazwisko}</td>}

                        {showM === true ?
                            <td><input type="text" id={id + '_nr_tel'} defaultValue={nr_tel} style={{ background_color: "inherit", border: "0" }} /></td>
                            : <td>{nr_tel}</td>}

                        {showM === true ?
                            <td><input type="text" id={id + '_email'} value={email} style={{ background_color: "inherit", border: "0" }} /></td>
                            : <td>{email}</td>}

                        <td style={showM === false ? { display: 'none' } : {}}><Button variant="outline-warning" size="sm" value={id} onClick={editUser}>Edytuj</Button></td>
                       
                        </tr>
                </tbody>
            </table>


        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Ladowanie tresci...</em></p>
            : userDetails.renderUser(this.state.id, this.state.imie, this.state.nazwisko, this.state.nr_tel, this.state.email,this.state.show);

        return (
            <div>
                <h1 id="tabelLabel" >Dane uzytkownika</h1>
                <br />
                <Button onClick={this.handleChecked}> Modul edycyjny
                </Button>
                <br /><br />
                {contents}
            </div>
        );
    }

    async populateUserData() {
        const token = await authService.getAccessToken();

        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);

        this.setState({
            email: user.name
        });
        
        axios.get(`/user/GetUser/` + this.state.email,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                this.setState({
                    id: response.data.id,
                    imie: response.data.imie,
                    nazwisko: response.data.nazwisko,
                    nr_tel: response.data.nr_tel,
                    loading: false
                });
            }).catch(function (error) {
                console.log(error);
            });

    }

}
////////////////////////////////////
const editUser = (event) => {
    let e = editData(event.target.value);
}

async function editData(idUser) {
    const imie = document.getElementById(idUser + '_imie').value;
    const nazwisko = document.getElementById(idUser + '_nazwisko').value;
    const nr_tel = document.getElementById(idUser + '_nr_tel').value;
    const email = document.getElementById(idUser + '_email').value;

    const token = await authService.getAccessToken();

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    axios.put(`/user/Edit/` + idUser,
        { 'id': idUser, 'imie': imie, 'nazwisko': nazwisko, 'nr_tel': nr_tel, 'email': email},
        { headers }).catch(error => console.log(error));

    return 0;
}

