import React from 'react'
import axios from 'axios'
import { DropDownList } from '@progress/kendo-react-dropdowns'

class editProduct extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeProductName = this.onChangeProductName.bind(this)
        this.onChangeUnit = this.onChangeUnit.bind(this)
        this.onAddItem = this.onAddItem.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.delete = this.delete.bind(this)
        this.deleteData = this.deleteData.bind(this)
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
            stock: [],
            databaseStore: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/product/editProduct/'+this.props.match.params.id)
        .then(res => {
            this.setState({ 
                name: res.data.name,
                unit: res.data.unit,
                store: res.data.store,
                databaseStore: res.data.store.map(obj => {return obj})
            })
        })
        .catch(err => {
            console.log(err)
        })

        axios.get('http://localhost:4000/stock/')
        .then(res => {
            this.setState({ stock: res.data})
        })
        .catch(err => {
            console.log(err)
        })
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

    delete(id) {
        const name = this.state.storeData.filter(list => {
            return list.storeId !== id
        })

        this.setState({
            storeData: name
        })
    }

    deleteData(id, index) {
        /*
        axios.get('http://localhost:4000/product/delete/delItem/'+id)
        .then(res => {
            console.log(res.data)
        })
        */

        let findIndex = this.state.databaseStore.map(obj => {return obj.storeId})
        let indexResult = findIndex.indexOf(id)

        let test = this.state.databaseStore
        console.log(test)
        test.splice(indexResult, 1)

        console.log(test)
        const obj = {
            name: this.state.name,
            unit: this.state.unit,
            store: test
        }
     
        axios.post('http://localhost:4000/product/update/'+this.props.match.params.id, obj)
        .then(
            res => console.log('delete')
        )

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
            storeData: [...this.state.storeData, test],
            store: this.state.store.map(obj => {return obj})
        })

        this.setState({
            detail: {
                item_quantity: ''
            }
        })

        //console.log(test.store_item_name.concat(this.state.databaseStore))
        console.log(this.state.databaseStore)

    }

    onSubmit(e) {
        const obj = {
            name: this.state.name,
            unit: this.state.unit,
            store: [...this.state.storeData]
        }
        
        let store = {
            name: this.state.name,
            unit: this.state.unit,
            store: obj.store.concat(this.state.databaseStore)
        }
        

        if(store.store.length !== 0) {
            axios.post('http://localhost:4000/product/update/'+this.props.match.params.id, store)
            .then(
                alert('Update pass')
            )
        }else {
            alert('Update fail')
        }
    }

    render() {
        const List = (({list, del}) => {
            const nameList = this.state.storeData.map((obj, key) => {
                    return (
                        <tr key={obj.storeId}>
                            <td>{obj.store_item_name}</td>
                            <td>{obj.store_item_quantity}</td>
                            <td><input type="submit" value="Delete" className="btn btn-danger" onClick={() => {del(obj.storeId)}}/></td>
                        </tr>
                    )
                })
            

            const Test = (props) => {
                return (
                    props.obj.map(obj => {
                        return (
                            <tr key={obj.storeId}>
                                <td>{obj.store_item_name}</td>
                                <td>{obj.store_item_quantity}</td>
                                <td>
                                    <input 
                                    type="submit" 
                                    value="Delete" 
                                    className="btn btn-danger" 
                                    onClick={() => this.deleteData(obj.storeId, obj)} 
                                    />
                                </td>
                            </tr>
                        )
                    })
                )
            }
            return (
                <tbody>
                    <Test obj={this.state.store} />
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <List list={this.state.storeData} del={this.delete} />
                </table>
            </form>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Edit Product Name: </label>
                <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeProductName}
                required
                />
            </div>
            <div className="form-group">
                <label>Edit Unit: </label>
                <input
                type="text"
                className="form-control"
                value={this.state.unit}
                onChange={this.onChangeUnit}
                required
                />
            </div>
            <input type="submit" className="btn btn-secondary" value="Update Product" />
            </form>

            
        </div>
    )
    }
}

export default editProduct

/*
        this.onChangeName = this.onChangeName.bind(this)
        this.onAddItem = this.onAddItem.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.delete = this.delete.bind(this)

        delete(id) {
        const name = this.state.storeData.filter(list => {
            return list.storeId !== id
        })

        this.setState({
            storeData: name
        })

        console.log(this.state.storeData)
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

*/