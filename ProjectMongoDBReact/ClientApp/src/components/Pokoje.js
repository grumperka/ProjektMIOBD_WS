import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import authService from './api-authorization/AuthorizeService'
import 'regenerator-runtime/runtime'

export class Pokoje extends Component {
    static displayName = Pokoje.name;

  constructor(props) {
    super(props);
      this.state = { pokoje: [], loading: true, show: false };

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
  

  static renderPokojeTable(pokojeList,showM) {
      return (
          this.toggle_button = [],
          <table className='table table-striped' aria-labelledby="tabelLabel">
              <thead>
                  <tr>
                      <th>Nr. pokoju</th>
                      <th>Nazwa</th>
                      <th>Ile osob</th>
                      <th>Cena</th>
                      <th style={showM === false ? { display: 'none' } : {}}>Usun</th>
                      <th style={showM === true ? { display: 'none' } : {}}>Rezerwacja</th>
                  </tr>
              </thead>
              <tbody>
                  {pokojeList.map(pokoj =>
                      <tr key={pokoj.id}>

                          <td>{pokoj.nr_pokoju}</td>

                          <td><a href={'/pokojDetails/' + pokoj.id}>{pokoj.nazwa}</a></td>

                          <td>{pokoj.ile_osob}</td>

                          <td>{pokoj.cena}</td>
                              
                          <td style={showM === false ? { display: 'none' } : {} }><Button variant="outline-danger" size="sm" value={pokoj.id} onClick={deletePokoj}>Usun</Button></td>

                          <td style={showM === true ? { display: 'none' } : {}}><Button variant="outline-success" href={'/addRezerwacja/' + pokoj.id}>Zarezerwuj</Button></td>
                          
              </tr>
                  )} 
        </tbody>
          </table>


      );
  }

  render() {
    let contents = this.state.loading
        ? <p><em>Ladowanie tresci...</em></p>
        : Pokoje.renderPokojeTable(this.state.pokoje, this.state.show);

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
            <br />
        {contents}
        </div>
    );
  }

  async populatePokojData() {
    const token = await authService.getAccessToken();
    const response = await fetch('pokoj/GetPokoje', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
      this.setState({ pokoje: data, loading: false });
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
                'id': idPokoj
            }

        }).then(window.location.reload());



    return 0;
}


