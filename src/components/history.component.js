import React from 'react'
import axios from 'axios'
import HistoryList from '../tablerows/historyListTable.component'

export default class StockList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {history: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/log/')
        .then(res => {
            this.setState({ history: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    tableRow() {
        return this.state.history.map((object, i) => {
            return <HistoryList obj={object} key={i} />
        })
    }

    render() {
        return (
            <div>
                <h3 align="center">Item List</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tableRow()}
                    </tbody>
                </table>
            </div>
        )
    }
}