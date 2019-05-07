import React from 'react'
import axios from 'axios'
import productList from '../components/productList.component'

class ProductListTable extends React.Component {

    constructor(props) {
        super(props)
        this.Show = this.Show.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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



    tableRow() {
        return this.state.stock.map((object, i) => {
            return <productList obj={object} key={i} />
        })
    }

    render() {
        return (
            <div>
                {this.tableRow()}
            </div>
        )
    }

}

export default ProductListTable