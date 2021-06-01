import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class Rented extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "Product id",
          field: "productId",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Product name",
          field: "productName",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Størrelse",
          field: "size",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Utleid til",
          field: "lastName",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Kundens epost",
          field: "email",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Tlf",
          field: "phoneNumber",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Utleid dato",
          field: "rentedDate",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Retur dato",
          field: "returnDate",
          sortable: true,
          filter: true,
        },
      ],
      rowData: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/rents")
      .then((res) => res.json())
      .then((rowData) => this.setState({ rowData }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="col-md-1">
        <div
          className="ag-theme-balham"
          style={{
            width: 1610,
            height: 600,
          }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

export default Rented;
