import React, { Component } from "react";
import axios from "axios";

class Deliveries extends Component {
  state = {
    productId: "",
    productName: "",
    size: "",
    comment: "",
    deliveryCartArray: [],
    deliveryData: [],
    newDamageId: "",
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:8080/rents")
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          deliveryData: res.data,
        });
        console.log("this.state.deliveryData");
        console.log(this.state.deliveryData);
      })
      .catch((err) => {
        throw err;
      });
  };

  getRents = () => {
    console.log("this.state i getRents:");
    console.log(this.state);
    axios
      .get("http://localhost:8080/rents")
      .then((res) => {
        console.log("res and res.data");
        console.log(res);
        console.log(res.data);
        const deliveryCart = res.data;
        console.log("deliveryCart");
        console.log(deliveryCart);
        this.filterProducts(deliveryCart);
        console.log("this.state.deliveryCartArray");
        console.log(this.state.deliveryCartArray);
      })
      .catch((err) => {
        throw err;
      });
  };

  filterProducts(deliveryCart) {
    for (var i = 0; i < deliveryCart.length; i++) {
      if (deliveryCart[i].productId == this.state.productId) {
        this.setState({
          productId: deliveryCart[i].productId,
          productName: deliveryCart[i].productName,
          comment: deliveryCart[i].comment,
          size: deliveryCart[i].size,
        });

        const newDeliveryItemObject = {
          productId: this.state.productId,
          productName: this.state.productName,
          comment: this.state.comment,
          size: this.state.size,
        };

        const tempDeliveryCart = this.state.deliveryCartArray;
        tempDeliveryCart.push(newDeliveryItemObject);

        this.setState({
          deliveryCartArray: tempDeliveryCart,
        });
        return deliveryCart[i];
      }
    }
  }

  deleteCart = () => {
    for (var i = 0; i < this.state.deliveryData.length; i++) {
      if (this.state.deliveryData[i].productId == this.state.productId) {
        const cartItemId = this.state.deliveryData[i]._id;
        this.setState({
          newDamageId: this.state.deliveryData[i]._id,
        });

        axios
          .delete(`http://localhost:8080/rents/${cartItemId}`)
          .then((res) => {
            console.log(res);
            console.log(res.data);
            console.log("deleted 1 item");
            alert("Plagg levert");
          })
          .catch((err) => {
            throw err;
          });
      }
    }
  };

  //   updateDamage = () => {
  //     console.log(this.state.comment);
  //     const newComment = {
  //       comment: this.state.comment,
  //     };
  //     const commentId = this.state.newDamageId;
  //     axios
  //       .patch(`http://localhost:8080/products/${commentId}`, {
  //         comment: this.state.comment,
  //       })
  //       .then((res) => {
  //         resolve(res.data.comment);
  //         console.log(res);
  //         console.log(res.data);
  //         console.log("comment edited");
  //       })
  //       .catch((err) => {
  //         throw err;
  //       });
  //   };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    // const toRented = {
    //   productId: this.state.productId,
    //   //   productName: this.state.productName,
    //   //   comment: this.state.comment,
    //   //   size: this.state.size,
    // };
    // const toProduct = {
    //   status: this.state.status,
    // };
    this.deleteCart();
    this.updateDamage();
  };

  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <div>
              <h2
                style={{
                  fontSize: "130%",
                  marginTop: "5%",
                  marginBottom: "2%",
                }}
              >
                Leveranse
              </h2>
            </div>
            <form noValidate onSubmit={this.handleSubmit}>
              <div className="input-field col s12">
                <input
                  type="text"
                  placeholder="Produkt ID"
                  name="productId"
                  value={this.productId}
                  onChange={this.changeHandler}
                />
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    backgroundColor: "antiquewhite",
                  }}
                  type="button"
                  onClick={this.getRents}
                  className="btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Legg til leveranse
                </button>
              </div>
              <div>
                {this.state.deliveryCartArray.map((deliveryCartArray, id) => (
                  <ul key={deliveryCartArray._id}>
                    <li>
                      PRODUKT ID: {deliveryCartArray.productId} <br />
                      PRODUKT NAVN: {deliveryCartArray.productName} <br />
                      STR: {deliveryCartArray.size} <br />
                      Slitasje: {deliveryCartArray.comment}
                      <br />
                    </li>
                  </ul>
                ))}
              </div>
              <div className="input-field col s12">
                <input
                  type="text"
                  placeholder="Skader/slitasje"
                  name="comment"
                  value={this.comment}
                  onChange={this.changeHandler}
                />
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
                  Lever
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Deliveries;
