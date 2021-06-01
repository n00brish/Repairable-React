import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSelection: "single",
      columnDefs: [
        {
          headerName: "Etternavn",
          field: "lastName",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Fornavn",
          field: "firstName",
          sortable: true,
          filter: true,
        },
        { headerName: "Epost", field: "email", sortable: true, filter: true },
        {
          headerName: "Tlf",
          field: "phoneNumber",
          sortable: true,
          filter: true,
        },
      ],
      rowData: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/customers")
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
            width: 810,
            height: 600,
          }}
        >
          <AgGridReact
            key={this.state.id}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            rowSelection={this.state.rowSelection}
          />
        </div>
      </div>
    );
  }
}

export default Customers;
