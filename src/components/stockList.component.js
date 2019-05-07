import React from 'react'
import axios from 'axios'
import StockListTable from '../tablerows/stockListTable.component'
import { Link } from 'react-router-dom'

export default class StockList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {stock: []}
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

    tableRow() {
        return this.state.stock.map((object, i) => {
            return <StockListTable obj={object} key={i} />
        })
    }

    render() {
        return (
            <div>
                <h3 align="center">Item List</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.tableRow() }
                    </tbody>
                </table>
                <Link to={"/addStock"} className="btn btn-primary" style={{marginRight: '15px'}}>Add</Link>
                <Link to={"/addUnit"} className="btn btn-primary">Create Unit</Link>
            </div>
        )
    }
}