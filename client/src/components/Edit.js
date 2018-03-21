import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customer: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/customer/'+this.props.match.params.id)
      .then(res => {
        this.setState({ customer: res.data });
        console.log(this.state.customer);
      });
  }

  onChange = (e) => {
    const state = this.state.customer
    state[e.target.name] = e.target.value;
    this.setState({customer:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, address, city, postalCode, phone } = this.state.customer;

    axios.put('http://localhost:8080/customer/'+this.props.match.params.id, { name, address, city, postalCode, phone })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT CUSTOMER
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.customer.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Customer List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={this.state.customer.name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="title">Address:</label>
                <input type="text" class="form-control" name="address" value={this.state.customer.address} onChange={this.onChange} placeholder="Address" />
              </div>
              <div class="form-group">
                <label for="author">City:</label>
                <input type="text" class="form-control" name="city" value={this.state.customer.city} onChange={this.onChange} placeholder="City" />
              </div>
              <div class="form-group">
                <label for="description">Postal Code:</label>
                <input type="number" class="form-control" name="postalCode" value={this.state.customer.postalCode} onChange={this.onChange} placeholder="Postal Code" />
              </div>
              <div class="form-group">
                <label for="published_date">Phone Number:</label>
                <input type="number" class="form-control" name="phone" value={this.state.customer.phone} onChange={this.onChange} placeholder="Phone Number" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
