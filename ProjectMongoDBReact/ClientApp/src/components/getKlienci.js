import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import authService from './api-authorization/AuthorizeService'
import 'regenerator-runtime/runtime'

export class getKlienci extends Component {
    static displayName = getKlienci.name;

  constructor(props) {
      super(props);
      this.state = { name: '', phrase: '', klient: [], loading: true };

      this.onInputchange = this.onInputchange.bind(this);
      this.handleChecked = this.handleChecked.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangePhrase = this.handleChangePhrase.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        this.populateKlienciData();
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
  

  static renderKlienciTable(klienciList) {
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
                  {klienciList.map(klient =>
                      <tr key={klient.id}>

                          <td>{klient.nazwisko}</td>

                          <td>{klient.imie}</td>

                          <td>{klient.nr_tel}</td>

                          <td>{klient.email}</td>

                          <td><a href={'/userData/' + klient.email }>Rezerwacje uzytkownika</a></td>
                          
              </tr>
                  )} 
        </tbody>
          </table>


      );
  }

  render() {
    let contents = this.state.loading
        ? <p><em>Oczekiwanie na fraze ...</em></p>
        : getKlienci.renderKlienciTable(this.state.klient);

    return (
      <div>
            <h1 id="tabelLabel" >Lista klientow</h1>
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
            <br />
        {contents}
        </div>
    );
  }

  async populateKlienciData() {
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

      const response = await fetch('user/GetKlient/' + this.state.name + '/' + this.state.phrase, {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
      this.setState({ klient: data, loading: false });
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
        'Id': idPokoj ,
        'nr_pokoju': parseInt(nrPokoju, 10),
        'nazwa': nazwa ,
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

