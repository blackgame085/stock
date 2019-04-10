import React from 'react'
import axios from 'axios'
import { DropDownList } from '@progress/kendo-react-dropdowns'

class addTest extends React.Component {

    constructor(props) {
        super(props)
        this.onChangeProductName = this.onChangeProductName.bind(this)
        this.onChangeProductItemName = this.onChangeProductItemName.bind(this)
        this.onChageProductItemQuantity = this.onChageProductItemQuantity.bind(this)
        this.onAddItem = this.onAddItem.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            product_name: '',
            product_show: [],
            product_detail: [{
                product_item_name: '',
                product_item_quantity: '',
                product_item_unit: '',
            }],
            stock: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/stock/')
        .then(res => {
            this.setState({ 
                stock: res.data
            })
        })
    }

    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value
        })
    }

    onChangeProductItemName(e) {
        const talget = e.target.value
        this.setState({
            product_item_name: talget.item_name
        })
    }

    onChageProductItemQuantity(e) {
        this.setState({
            product_detail: {
                product_item_quantity: e.target.value
            }
        })
    }

    onAddItem(e) {
        e.preventDefault()
        const test = this.state.product_detail
        const obj = {
            product_detail: {
                product_item_name: this.state.product_item_name,
                product_item_quantity: test.product_item_quantity
            }
        }


        axios.post('http://localhost:4000/product/addProduct', obj)
        .then(
            res => console.log("Added")
        )

        //console.log(obj)

        //this.addTodo(obj.product_detail.product_item_name)
    }

    onSubmit(e) {
        e.preventDefault()
        const test = this.state.product_detail
        const obj = {
            product_name: this.state.product_name,
            product_detail: {
                product_item_name: this.state.product_item_name,
                product_item_quantity: test.product_item_quantity
            }
        }

        console.log(obj)

    }

    render() {
        const inputValue = this.state.product_detail
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                        type="text"
                        required="required"
                        className="form-control"
                        value={this.state.product_name}
                        onChange={this.onChangeProductName}
                        />
                    </div>
                </form>
                <form onSubmit={this.onAddItem} style= {{
                    marginLeft: "10%",
                    marginRight: "20%",
                    marginBottom: "50px",
                    marginTop: "20px"
                }}>
                    <div className="form-group">
                        <label>Add Item: </label>
                        <DropDownList 
                            data={this.state.stock}
                            textField="item_name"
                            dataItemKey="_id"
                            onChange={this.onChangeProductItemName}
                        />
                    </div>
                    <div className="form-group">
                        <label>จำนวน: (กรัม/ มิลลิลิตร)</label>
                        <input 
                        type="number"
                        className="form-control"
                        value={inputValue.product_item_quantity}
                        onChange={this.onChageProductItemQuantity}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Item" className="btn btn-primary" />
                    </div>
                </form>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>

                </table>
                <form onSubmit={this.onSubmit}>
                    <input type="submit" value="Add Product" className="btn btn-primary" />
                </form>
            </div>
        )
    }
}

export default addTest

/*
        const List = (({list}) => {
            const nameList = list.length ? (
                this.state.product_detail.map(obj => {
                    return (
                        <tr key={obj.product_item_name._id}>
                            <td>{obj.product_item_name.item_name}</td>
                        </tr>
                    )
                })
            ) : (
                <tr><td>Please add item</td></tr>
            )
            return (
                <tbody>
                    {nameList}
                </tbody>
            )
        })
        
<List list={this.state.product_detail} />

    */

/*
import React from 'react'

class addProduct extends React.Component {

    constructor(props) {
        super(props)
        this.onChangeProductName = this.onChangeProductName.bind(this)
        this.onChangeProductDetails = this.onChangeProductDetails.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            product: {
                name: '',
                detail: [{
                    item_name: '',
                    item_quantity: '',
                    item_unit: ''
                }],
            },
            store: []
            
            
        }
    }

    onChangeProductName(name) {
        const product = this.state.product
        product.name = name
        this.setState({
            name
        })
    }

    onChangeProductDetails(detailIndex, detailKey, value){
        let product = this.state.product
        product.detail[detailIndex][detailKey] = value
        this.setState({
            value
        })
    } 

    onSubmit(e) {
        e.preventDefault()
        console.log(this.state.product.name)
        this.setState({
            store: [...this.state.store, this.state.product.detail]
        })
        console.log(this.state.store)
    }

    productInput (){
        return  (
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <label>Add Product Name</label>
                <input
                type="text"
                className="form-control"
                value={this.state.product.name}
                onChange={e => {this.onChangeProductName(e.target.value)}}
                />
            </div>

            <div className="form-group">
            <label>Add Item Name</label>
                <input
                type="text"
                className="form-control"
                value={this.state.product.detail.item_name}
                onChange={e => {this.onChangeProductDetails( 0, "item_name", e.target.value)}}
                />
            </div>
            <input type="submit" value="Add" className="btn btn-primary" />
        </form>
        ) 
    }

    render() {
        return (
            <div>
                {this.productInput()}
            </div>
        )
    }
}

export default addProduct
*/