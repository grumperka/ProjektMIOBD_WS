import React, { Component } from 'react';
import { Button, Badge, Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import authService from './api-authorization/AuthorizeService'
import 'regenerator-runtime/runtime'

export class getAllRachunki extends Component {
    static displayName = getAllRachunki.name;

  constructor(props) {
    super(props);
      this.state = { name: '',rezerwacje: [], loading: true};

      this.onInputchange = this.onInputchange.bind(this);
    }


  componentDidMount() {
    this.populateRachunekData();
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

  

  static renderRachunkiTable(rachunkiList) {
      return (
          this.toggle_button = [],
          <table className='table table-striped' aria-labelledby="tabelLabel">
              <thead>
                  <tr>
                      <th>Rezerwacja</th>
                      <th>Koniec rezerwacji</th>
                      <th>Koszt</th>
                      <th>Czy zaplacony?</th>
                      <th>Data uregulowania</th>
                  </tr>
              </thead>
              <tbody>
                  {rachunkiList.map(bill =>
                      <tr key={bill.id}>

                          <td><a href={'/rachunekDetails/' + bill.id_rezerwacji}>Rezerwacja</a></td>

                          <td>{bill.koniec}</td>

                          <td>{bill.koszt}</td>

                          <td>{bill.czyUregulowany === true ? <Badge pill variant="success">Zaplacone</Badge> : <Badge pill variant="secondary">Niezaplacone</Badge>}</td>

                          <td>{bill.dataUregulowania}</td>

                          <td style={bill.czyUregulowany === true ? { display: 'none' } : {}}><Button variant="outline-success" value={bill.id_rezerwacji} onClick={makeBill}>Zaplac</Button></td>


              </tr>
                  )} 
        </tbody>
          </table>


      );
  }

  render() {
    let contents = this.state.loading
        ? <p><em>Ladowanie tresci...</em></p>
        : getAllRachunki.renderRachunkiTable(this.state.rezerwacje);

    return (
      <div>
            <h1 id="tabelLabel" >Lista rachunkow</h1>
            <br />
            <br />
        {contents}
        </div>
    );
  }

  async populateRachunekData() {
      const token = await authService.getAccessToken();

      const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);

      this.setState({
          name: user.name
      });

    const response = await fetch('rachunek/GetRachunek/' + this.state.name, {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
      const data = await response.json();
      this.setState({ rezerwacje: data, loading: false });
    }

}

////////////////////////////////////// 
const makeBill = (event) => {
    let e = makeData(event.target.value);
    console.log(event.target.value);
}

async function makeData(idRezerv) {
    const token = await authService.getAccessToken();

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    axios.put(`/rachunek/MakeBill/` + idRezerv,
        { 'id': idRezerv, 'dateTime': new Date() },
        { headers }).catch(error => console.log(error));

    return 0;
}