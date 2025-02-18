import React, { useState, useEffect } from 'react';
import './App.css';

export default function AttrezzaturaApp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Sostituisci questo URL con quello generato dal tuo Google Sheet pubblicato in formato CSV
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQVJ1-ZUea7Y8A8kDENxCzju_HrhTKZmtaRFpGMEXPpoeb1UKZby28Yq9h55yYLJgJAWFYMh8a_NxTe/pub?gid=0&single=true&output=csv";
    fetch(csvUrl)
      .then(response => response.text())
      .then(csv => {
        const rows = csv.split("\n").map(row => row.split(","));
        const values = rows.slice(1); // Salta l'intestazione

        setData(values.map(row => ({
          data: row[0],
          attrezzatura: row[1],
          descrizione: row[2],
          quantita: row[3]
        })));
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Inventario Attrezzature</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Data</th>
            <th>Attrezzatura</th>
            <th>Descrizione</th>
            <th>Quantità</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.data}</td>
              <td>{entry.attrezzatura}</td>
              <td>{entry.descrizione}</td>
              <td>{entry.quantita}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
