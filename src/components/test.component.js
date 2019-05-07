import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class productList extends React.Component {

    constructor(props) {
        super(props)
        this.Show = this.Show.bind(this)
        this.state = {
            stock: [],
            storeNumber: [],
            storeId: [],
            store: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/product')
        .then(res => {
            this.setState({
                stock: res.data,
                storeNumber: res.data.map(obj => {
                    return obj.store.map(object => {
                        return parseInt(object.store_item_quantity[0])
                    })
                })
            })
        })
    }

    Show() {
        let store = this.state.storeNumber
        console.log(store.map(obj => {return obj}))
        const Test = (props) => {
            return <td align="center" obj={props._id}><Link to={"/editProduct/"+props.obj._id} className="btn btn-primary">Edit</Link></td>
            
        }


        if(store.length <= store.length+1) {
        let i = 0
         return this.state.stock.map(obj => {
            return (
                <tr key={obj._id}>
                    <td>{obj.name}</td>
                    <td>{Math.min.apply(null, store[i++])}</td>
                    <td>{obj.unit}</td>
                    <Test obj={obj}/>
                    <td align="center"><Link to={"/editProduct"} className="btn btn-primary">Delete</Link></td>
                </tr>
            )   
        })
    }
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <table className="table">
                            <thead className="thead-dark" style={{textAlign: 'center'}}>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Quantity</th>
                                    <th>unit</th>
                                    <th colSpan="2" style={{textAlign: "center"}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.Show()}
                            </tbody>
                        </table>
                    </div>
                    <input type="submit" value="test"/>
                </form>
                <Link to={"/addProduct"} className="btn btn-primary">Add Product</Link>
            </div>
        )
    }

}

export default productList