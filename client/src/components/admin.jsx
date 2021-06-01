import React, { Component } from "react";
import axios from "axios";

class AddProduct extends Component {
  state = {
    productId: "",
    productName: "",
    price: "",
    comment: "",
    category: "",
    size: "",
    status: "",
    phoneNumber: "",
    customerData: [],
    customerId: "",
    id: "",
  };

  componentDidMount = () => {
    console.log(this.state);
    axios
      .get("http://localhost:8080/customers/")
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          customerData: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });

    axios
      .get("http://localhost:8080/products/")
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          productData: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  deleteProduct = () => {
    console.log(this.state.productData);
    for (var i = 0; i < this.state.productData.length; i++) {
      if (this.state.productData[i].productId == this.state.productId) {
        const productId = this.state.productData[i]._id;

        axios
          .delete(`http://localhost:8080/products/${productId}`)
          .then((res) => {
            console.log(res);
            console.log(res.data);
            alert("Slettet produkt!");
          })
          .catch((err) => {
            alert("Det er ingen produkter med denne ID'en");
            throw err;
          });
      }
    }
  };

  deleteCustomer = () => {
    console.log(this.state.customerData);
    for (var i = 0; i < this.state.customerData.length; i++) {
      console.log("this.state.customerData[i].phoneNumber");
      console.log(this.state.customerData[i].phoneNumber);
      if (this.state.customerData[i].phoneNumber == this.state.phoneNumber) {
        const customerId = this.state.customerData[i]._id;

        axios
          .delete(`http://localhost:8080/customers/${customerId}`)
          .then((res) => {
            console.log(res);
            console.log(res.data);
            alert("Kunde slettet!");
          })
          .catch((err) => {
            alert("Ingen kunder med dette nummeret");
            throw err;
          });
      }
    }
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const products = {
      productId: this.state.productId,
      productName: this.state.productName,
      price: this.state.price,
      comment: this.state.comment,
      category: this.state.category,
      size: this.state.size,
      status: this.state.status,
    };
    axios
      .post("http://localhost:8080/products", products)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        throw err;
      });

    this.setState({
      productId: "",
      productName: "",
      price: "",
      comment: "",
      category: "",
      size: "",
      status: "",
    });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s0">
            <div className="col s12" style={{ paddingTop: "10px" }}>
              <h3
                style={{
                  fontSize: "130%",
                  marginTop: "5%",
                  marginBottom: "2%",
                }}
              >
                Registrer nytt produkt
              </h3>
              <form noValidate onSubmit={this.handleSubmit}>
                <div className="input-field col s12">
                  <input
                    type="text"
                    placeholder="Produkt ID"
                    name="productId"
                    value={this.productId}
                    onChange={this.changeHandler}
                  />
                  <input
                    type="text"
                    placeholder="Produkt Navn"
                    name="productName"
                    value={this.productName}
                    onChange={this.changeHandler}
                  />
                  <input
                    type="text"
                    placeholder="Pris"
                    name="price"
                    value={this.price}
                    onChange={this.changeHandler}
                  />
                  <input
                    type="text"
                    placeholder="Kommentar"
                    name="comment"
                    value={this.comment}
                    onChange={this.changeHandler}
                  />
                  <input
                    type="text"
                    placeholder="Kategori"
                    name="category"
                    value={this.category}
                    onChange={this.changeHandler}
                  />
                </div>
                <div>
                  <select
                    name="size"
                    value={this.size}
                    onChange={this.changeHandler}
                  >
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                </div>
                <div>
                  <select
                    name="status"
                    value={this.status}
                    onChange={this.changeHandler}
                  >
                    <option>I butikk</option>
                    <option>Utleid</option>
                  </select>
                </div>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    backgroundColor: "antiquewhite",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Legg til produkt
                </button>
              </form>

              <h3
                style={{
                  fontSize: "130%",
                  marginTop: "5%",
                  marginBottom: "2%",
                }}
              >
                Slett kunde
              </h3>
              <form>
                <div className="input-field col s12">
                  <input
                    id="inputField"
                    type="text"
                    placeholder="Kundens tlfnr"
                    name="phoneNumber"
                    value={this.phoneNumber}
                    onChange={this.changeHandler}
                  />
                </div>

                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    backgroundColor: "antiquewhite",
                  }}
                  type="button"
                  onClick={this.deleteCustomer}
                  className="btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Slett Kunde
                </button>
              </form>
              <h2
                style={{
                  fontSize: "130%",
                  marginTop: "5%",
                  marginBottom: "2%",
                }}
              >
                Slett produkt
              </h2>
              <form>
                <div className="input-field col s12">
                  <input
                    type="text"
                    placeholder="Produkt ID"
                    name="productId"
                    value={this.productId}
                    onChange={this.changeHandler}
                  />
                </div>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    backgroundColor: "antiquewhite",
                  }}
                  type="button"
                  className="btn btn-large waves-effect waves-light hoverable accent-3"
                  onClick={this.deleteProduct}
                >
                  Slett produkt
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProduct;
