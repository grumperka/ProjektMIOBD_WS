import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
    return (
      <div>
        <h1>Witaj uzytkowniku!</h1>
        <p>Ponizsze linki sa dostepne dla pracownikow hotelu:</p>
            <ul>
                <li><a href='/getAllRezerwacje'>Wszystkie rezerwacje w bazie</a></li>
                <li><a href='/getAllRachunki'>Wszystkie rachunki w bazie</a></li>
                <li><a href='/getKlienci'>Wszyscy klienci w bazie</a></li>
                <li><a href='/getPracownicy'>Wszyscy pracownicy w bazie</a></li>
        </ul>
        </div>
    );
  }
}
