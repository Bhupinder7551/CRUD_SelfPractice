

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { type } from 'os';
import Product from '../shopping/product.jsx';
import Store from '../shopping/Store.jsx';
import Sales from '../shopping/sales.jsx';

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            customerList: [],
            Name: '',
            Number: '',
            Address: '',
            showEdit: false,

        }
        this.loadData = this.loadData.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onCreateSubmit = this.onCreateSubmit.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.getEdit = this.getEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.update = this.update.bind(this)
    }
    
    // List of Customer
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        $.ajax({
            url: "/Home/CustomerList",
            type: "GET",
            success: function (data) {
                this.setState({
                    customerList: data
                })
                console.log("customerData =", data)
            }.bind(this)

        })
    }
    // Get Edit
    getEdit(id) {
        this.setState({
            showEdit: true,

        })

        $.ajax({
            url: "/Home/GetEditCustomer",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                var obj = JSON.parse(data);
                this.setState({
                    customerId: obj.Id,
                    customerName: obj.Name,
                    customerAddress: obj.Address
                })
                console.log("ssssssssssddddddddddda:", data)
            }.bind(this)

        });
    }
    closeEdit() {
        this.setState({
            showEdit: false,
        })
    }
    // update
    update() {
        let data = { Id: this.state.customerId, Name: this.state.customerName, Address: this.state.customerAddress };

        $.ajax({
            url: "/Home/EditCustomer",
            type: "POST",
            data: data,
            success: function (data) {
                this.setState({
                    Success: data
                })
                window.location.reload()
                console.log("update data:", data)
            }.bind(this)

        });
    }

    // Add Customer
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onCreateSubmit() {
        let data = { 'Name': this.state.Name, 'Address': this.state.Address, 'Age': this.state.Age };
        $.ajax({
            url: "/Home/AddCustomer",
            type: "POST",
            data: data,
            success: function (data) {
                this.setState({
                    success: data

                })
                window.location.reload()
                console.log("customerData =", data)
            }.bind(this)

        })
    }
    // Delete Customer
    onDelete(id) {
        $.ajax({
            url: "/Home/DeleteCustomer",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({
                    success: data
                })

                console.log("customerData =", data)
            }.bind(this)


        })
        window.location.reload()
    }




    render() {
        let list = this.state.customerList;
        let tableData = null;
        if (list != "") {
            tableData = list.map(x =>
                <div >
                    <div key={x.Id} style={{ float: "left", marginLeft: "50px", marginTop: "50px" }} class="ui cards">
                        <div class="ui black card">
                            <div class="content">
                                <img class="right floated mini ui image" src={`https://joeschmoe.io/api/v1/${x.Name}`} />
                                <div class="header">
                                    {x.Name}
                                </div>
                                <div class="meta">
                                    {x.Id}
                                </div>
                                <div class="description">
                                    {x.Address}
                                </div>
                            </div>
                            <div class="extra content">
                                <div class="ui two buttons">
                                    <div onClick={this.getEdit.bind(this, x.Id)} class="ui basic green button">Edit</div>
                                    <div onClick={this.onDelete.bind(this, x.Id)} class="ui basic red button">Delete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            )
        }
        let option = null;
        if (this.state.showEdit) {
            option =
                <div class="ui form">
                    <input type="text" name="customerName" onChange={this.handleChange} defaultValue={this.state.customerName} />
                    <input type="text" name="customerId" onChange={this.handleChange} defaultValue={this.state.customerId} />
                    <input type="text" name="customerAddress" onChange={this.handleChange} defaultValue={this.state.customerAddress} />
                    <div onClick={this.closeEdit} class="ui submit button">Cancel</div>
                    <div onClick={this.update} class="ui submit button">Update</div>

                </div>
        }
        else {
            console.log("get Edit data is", this.state.customerName)

        }

        return (

            <div>



                <div style={{ margin: "20px", float: "right" }} class="ui form">
                    <div class="fields">
                        <div class="field">

                            <input type="text" name="Name" onChange={this.handleChange} placeholder="Name" />
                        </div>
                        <div class="field">
                            <input type="number" name="Number" onChange={this.handleChange} placeholder="Number" />
                        </div>
                        <div class="field">
                            <input type="text" name="Address" onChange={this.handleChange} placeholder="Address" />
                        </div>
                        <div class="field">
                            <div onClick={this.onCreateSubmit} class="ui submit button">Add</div>
                        </div>


                    </div>
                </div>

                <h1 style={{ textAlign: "center" }} class="ui header">
                    <img src="https://joeschmoe.io/api/v1/patrick" class="ui circular image" />
                    List of Customer </h1>
                {option}


                {tableData}


                <Product />


                <Sales />

                <Store />
            </div >

        )
    }

}






