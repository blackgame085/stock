import React from 'react'
import axios from 'axios'
import { DropDownList } from '@progress/kendo-react-dropdowns'

class addProduct extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeProductName = this.onChangeProductName.bind(this)
        this.onChangeUnit = this.onChangeUnit.bind(this)
        this.onAddItem = this.onAddItem.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.delete = this.delete.bind(this)

        this.state = {
            name: '',
            unit: '',
            detail: {
                item_name: '',
                item_quantity: ''
            },
            store: [],
            storeId: [],
            store_item_name: [],
            store_item_quantity: [],
            storeData: [],
            stock: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/stock/')
        .then(res => {
            this.setState({ stock: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    delete(id) {
        const name = this.state.storeData.filter(list => {
            return list.storeId !== id
        })

        this.setState({
            storeData: name
        })

        console.log(this.state.storeData)
    }

    onChangeProductName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeUnit(e) {
        this.setState({
            unit: e.target.value
        })
    }

    onChangeName(name, value) {
        let detail = this.state.detail
        detail[name] = value 
        
        this.setState({
            value
        })
        
    }

    onAddItem(e) {
        e.preventDefault()
        /*
        this.setState({
            store_item_name: [...this.state.store_item_name, this.state.detail.item_name],
            store_item_quantity: [...this.state.store_item_quantity, this.state.detail.item_quantity],
        })
        */
        let a = Math.floor(Math.random() * 10000000)+Math.random().toString(36).slice(7)
        const test = {
            storeId: a,
            store_item_name: [...this.state.store_item_name, this.state.detail.item_name],
            store_item_quantity: [...this.state.store_item_quantity, this.state.detail.item_quantity],
        }

        this.setState({
            name: this.state.name,
            unit: this.state.unit,
            storeData: [...this.state.storeData, test]
        })
        console.log(test.storeId)
        this.setState({
            detail: {
                item_quantity: ''
            }
        })
    }

    onSubmit(e) {
        const obj = {
            name: this.state.name,
            unit: this.state.unit,
            store: this.state.storeData,
        }

        axios.post('http://localhost:4000/product/addProduct', obj)
        .then(
            window.location.reload()
        )
        console.log(obj)
    }
    

    render() {
        const List = (({list, del}) => {
            const nameList = list.length ? (
                this.state.storeData.map((obj, key) => {
                    return (
                        <tr key={obj.storeId} onClick={() => {del(obj.storeId)}}>
                            <td>{obj.store_item_name}</td>
                            <td>{obj.store_item_quantity}</td>
                        </tr>
                    )
                })
            ) : (
                <tr><td>Please add Item</td></tr>
            )
            return (
                <tbody>
                    {nameList}
                </tbody>
            )
        })

        
        
        return (
            <div>
            <form onSubmit={this.onAddItem}>
                <div style= {{
                    marginLeft: "10%",
                    marginRight: "20%",
                    marginBottom: "10px",
                    marginTop: "20px"
                }}>
                    <div className="form-group">
                        <label>Add Item: </label>
                        <DropDownList 
                            data={this.state.stock}
                            textField="item_name"
                            dataItemKey="_id"
                            onChange={e => {this.onChangeName("item_name", e.target.value.item_name)}}
                            defaultItem=''
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>ปริมาณ (กรัม / มิลลิลิตร) </label>
                        <input
                        type="number"
                        className="form-control"
                        value={this.state.detail.item_quantity}
                        onChange={e => {this.onChangeName( "item_quantity", e.target.value)}}
                        required
                        />
                    </div>
                    <input type="submit" className="btn btn-primary"value="Add" />
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <List list={this.state.storeData} del={this.delete} />
                </table>
            </form>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Add Product Name: </label>
                <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeProductName}
                required
                />
            </div>
            <div className="form-group">
                <label>Add Unit: </label>
                <input
                type="text"
                className="form-control"
                value={this.state.unit}
                onChange={this.onChangeUnit}
                required
                />
            </div>
            <input type="submit" className="btn btn-secondary" value="Add Product" />
            </form>

            
        </div>
    )
    }
}

export default addProduct