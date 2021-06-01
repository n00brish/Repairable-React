import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "Id",
          field: "productId",
          sortable: true,
          filter: true,
          resizable: true,
        },
        {
          headerName: "Navn",
          field: "productName",
          sortable: true,
          filter: true,
          resizable: true,
        },
        {
          headerName: "Pris",
          field: "price",
          sortable: true,
          filter: true,
          resizable: true,
        },
        {
          headerName: "Skade/ slitasje",
          field: "comment",
          sortable: true,
          filter: true,
          resizable: true,
        },
        {
          headerName: "Produktkategori",
          field: "category",
          sortable: true,
          filter: true,
          resizable: true,
        },
        {
          headerName: "Størrelse",
          field: "size",
          sortable: true,
          filter: true,
          resizable: true,
        },
        {
          headerName: "Status",
          field: "status",
          sortable: true,
          filter: true,
          resizable: true,
        },
      ],
      rowData: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/products")
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
            width: 1410,
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

export default Products;
