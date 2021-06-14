import React, { Component } from 'react';
import { Button, Badge, Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import authService from './api-authorization/AuthorizeService'
import 'regenerator-runtime/runtime'

export class getRezerwacje extends Component {
    static displayName = getRezerwacje.name;

  constructor(props) {
    super(props);
      this.state = { name: '',rezerwacje: [], loading: true, show: false };

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
  

  static renderRezerwacjeTable(rezerwacjeList,showM) {
      return (
          this.toggle_button = [],
          <table className='table table-striped' aria-labelledby="tabelLabel">
              <thead>
                  <tr>
                      <th>Pokoj</th>
                      <th>Poczatek rezerwacji</th>
                      <th>Koniec rezerwacji</th>
                      <th>Koszt</th>
                      <th>Czy anulowana?</th>
                      <th>Czy zaplacona?</th>
                      <th style={showM === true ? { display: 'none' } : {}}>Anuluj rezerwacje</th>
                      <th style={showM === true ? { display: 'none' } : {}}>Zaplac</th>
                      <th style={showM === false ? { display: 'none' } : {}}>Edytuj rezerwacje</th>
                  </tr>
              </thead>
              <tbody>
                  {rezerwacjeList.map(rezerw =>
                      <tr key={rezerw.id}>

                          <td><a href={ '/pokojDetails/'+ rezerw.id_pokoju}>Pokoj</a></td>

                          <td>{showM === false ? rezerw.poczatek : <Form.Control type="date" id={rezerw.id + "_startInput"} defaultValue={rezerw.poczatek} />}</td>

                          <td>{showM === false ? rezerw.koniec : <Form.Control type="date" id={rezerw.id + "_endInput"} defaultValue={rezerw.koniec} />}</td>

                          <td>{rezerw.koszt}</td>

                          <td>{rezerw.czyAnulowana === false ? <Badge pill variant="success">Aktualna</Badge> : <Badge pill variant="secondary">Anulowana</Badge>}</td>

                          <td>{rezerw.czyOplacona === true ? <Badge pill variant="success">Zaplacone</Badge> : <Badge pill variant="secondary">Niezaplacone</Badge>}</td>

                          <td style={showM === true || rezerw.czyAnulowana === true ? { display: 'none' } : {}}><Button variant="outline-danger" size="sm" value={rezerw.id} onClick={cancelRezerv}>Anuluj</Button></td>

                          <td style={showM === true || rezerw.czyAnulowana === true || rezerw.czyUregulowany === true ? { display: 'none' } : {}}><Button variant="outline-success" value={rezerw.id} onClick={makeBill}>Zaplac</Button></td>

                          <td style={showM === false || rezerw.czyAnulowana === true ? { display: 'none' } : {}}><Button variant="outline-warning" value={rezerw.id} onClick={editRezerv}>Edytuj</Button></td>
                          
              </tr>
                  )} 
        </tbody>
          </table>


      );
  }

  render() {
    let contents = this.state.loading
        ? <p><em>Ladowanie tresci...</em></p>
        : getRezerwacje.renderRezerwacjeTable(this.state.rezerwacje, this.state.show);

    return (
      <div>
            <h1 id="tabelLabel" >Lista twoich rezerwacji</h1>
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

      const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);

      this.setState({
          name: user.name
      });

    const response = await fetch('rezerwacja/GetRezerwacje/' + this.state.name, {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
      const data = await response.json();
      this.setState({ rezerwacje: data, loading: false });
    }

}

////////////////////////////////////
const cancelRezerv = (event) => {
    let e = cancelData(event.target.value);
    console.log(event.target.value);
}

async function cancelData(idRezerv) {
   

    const token = await authService.getAccessToken();

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    axios.put(`/rezerwacja/Cancel/` + idRezerv,
        { 'id': idRezerv },
        { headers })
        .then(
            window.location.replace('https://localhost:44334/getRezerwacje')
        ).catch(error => console.log(error));
        
    return 0;
}

//////////////////////////////////////
const editRezerv = (event) => {
    let e = editData(event.target.value);
    console.log(event.target.value);
}

async function editData(idRezerv) {
    const poczatekInput = document.getElementById(idRezerv + '_startInput').value;
    const koniecInput = document.getElementById(idRezerv + '_endInput').value;

    const token = await authService.getAccessToken();

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    axios.put(`/rezerwacja/Edit/` + idRezerv,
        { 'id': idRezerv, 'poczatek': poczatekInput, 'koniec': koniecInput, 'dataEdycji': new Date() },
        { headers })
        .then(
            window.location.reload()
        )
        .catch(error => console.log(error));

    return 0;
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
        { headers })
        .then(
            window.location.replace('https://localhost:44334/getRezerwacje')
    )
        .catch(error => console.log(error));

    return 0;
}