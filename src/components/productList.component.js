import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class productList extends React.Component {

    constructor(props) {
        super(props)
        this.checkSubmit = this.checkSubmit.bind(this)
        this.delete = this.delete.bind(this)
        this.state = {
            product_stock: [],
            item_stock: [],
            unit_stock: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/product')
        .then(res => {
            this.setState({
                product_stock: res.data
            })
        })

        axios.get('http://localhost:4000/stock')
        .then(res => {
            this.setState({
                item_stock: res.data
            })
        })

        axios.get('http://localhost:4000/unit')
        .then(res => {
            this.setState({
                unit_stock: res.data
            })
        })

    }

    delete(id) {
        axios.get('http://localhost:4000/product/delete/'+id)
        .then(
            
        )
        .catch(err => console.log(err))
    }

    findNumber(quantity, name) {
        const storeList = {
            item: {
                item_name: this.state.item_stock.map(obj => {return obj.item_name}),
                item_quantity: this.state.item_stock.map(obj => {return obj.quantity}),
                item_unit: this.state.item_stock.map(obj => {return obj.unit}),
                unit_name: this.state.unit_stock.map(obj=> {return obj.unit_name}),
                unit_number: this.state.unit_stock.map(obj => {return obj.unit_number})
            }
        }

        //หาชื่อเพื่อไป Match หา Array
        let findMatchName // Pass
        name.find(e => {return findMatchName = (e = name)})

        let findUnit = []
        
        findMatchName.forEach(e => {
            //ฟังก์ชันที่เอาไว้หา index จากชื่อ
            function findIndex(element) {
                return element === e
            }

            // .push เพื่อเก็บเป็น array หลายตัวจากการหา index จาก ชื่อ
            findUnit.push(storeList.item.item_name.findIndex(findIndex))
            
        })

        let findItemUnitName = []
        let itemQuantity = []
        for(let i = 0; i < findUnit.length; i++) { // มีผลเหมือน forEach Array
            //findItemUnitName.push(storeList.item.item_unit[findUnit[i]])
            findItemUnitName.push(storeList.item.item_unit[findUnit[i]])
            itemQuantity.push(storeList.item.item_quantity[findUnit[i]]) 
        }

        let unitIndex = []
        findItemUnitName.forEach(e => {
            function findIndex(element) {
                return element === e
            }

            unitIndex.push(storeList.item.unit_name.findIndex(findIndex))
        })

        let findNumber = []
        for(let i = 0; i < unitIndex.length; i++) {
            findNumber.push(storeList.item.unit_number[i])
        }

        let findLastNumber = []
        for(let i = 0; i < name.length; i++) {
            findLastNumber.push(Math.floor((itemQuantity[i] * findNumber[i])/quantity[i]))     
        }

        let storeLastNumber = Math.min.apply(null, findLastNumber)


        //let findUnit = []
        //findMatchName.forEach(e=> {findUnit.push(e)}) // Pass


        let test = {
            product :{
                name: findMatchName,
                product_unit: quantity,
                product_unit_index: findUnit,
                item_quantity: itemQuantity,
                item_unit_name: findItemUnitName,
                item_unit_index: unitIndex,
                item_unit_number: findNumber,
                storeShowNumber: storeLastNumber

            }
        }

            
        return test.product.storeShowNumber

    }

    checkSubmit(e) {        
        //key={props.obj.product.product_detail.map(obj => {return obj._id})}
        const TableDetail = props => {
            return (
                props.obj.map(obj => {
                    //console.log(obj.store.map(obj => {return parseInt(obj.store_item_quantity)}))
                    return (
                        <tr key={obj._id}>
                            <td>
                                {obj.name}
                            </td>
                            <td>
                                {this.findNumber(
                                    obj.store.map(obj => {return parseInt(obj.store_item_quantity)}),
                                    obj.store.map(obj => {return obj.store_item_name[0]}),
                                )}
                            </td>
                            <td>
                                {obj.unit}
                            </td>
                            <td>
                                <Link to={"/editProduct/"+obj._id} className="btn btn-primary">Edit</Link>
                            </td>
                            <td>
                                <input
                                type="submit"
                                value="Delete"
                                onClick={() => {this.delete(obj._id)}} 
                                className="btn btn-danger"
                                />
                            </td>
                        </tr>
                    )
                })
            )
        }
        return (
            <TableDetail obj={this.state.product_stock} />
        )


    }

    render() {
        return (
            <div>
                <form>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th colSpan="2" align="center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.checkSubmit()}
                        </tbody>
                    </table>
                    <Link to={"/addProduct"} className="btn btn-primary">Add Product</Link>
                </form>
            </div>
        )
    }
}

export default productList