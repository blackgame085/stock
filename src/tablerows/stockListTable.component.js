import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



class StockListTable extends React.Component {

    constructor(props) {
        super(props)
        this.delete = this.delete.bind(this)
        this.state = {
            item_name: '',
            quantity: '',
            unit: '',
            warning: '',
            history_log: [],
            history_log_status: [],
            date: new Date()
        }
    }

    formatDate(date) {
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        let ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes
        seconds = seconds < 10 ? '0'+seconds : seconds
        let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime
        
    }

    delete() {
        const log = {
            history_log: `You have been delete ${this.props.obj.item_name}`,
            history_log_status: `Delete`,
            date: this.formatDate(this.state.date)
        }
        axios.get('http://localhost:4000/stock/delete/'+this.props.obj._id)
        .then(
            axios.post('http://localhost:4000/log/addLog', log)
            .then(
                console.log(`delete ${this.props.obj.item_name}`)
            )
        )
        .catch(err => console.log(err))
    }

    colorCheck() {
        const number = this.props.obj.quantity
        const warn = this.props.obj.warning
        if(number <= warn){
            return (
                <td style={{color: "red"}}>
                    {this.props.obj.quantity}
                </td>
            )
        } else {
            return (
                <td>
                    {this.props.obj.quantity}
                </td>
            )
        }
    }


    render() {
        return (
                <tr>
                    <td>
                        {this.props.obj.item_name}
                    </td>
                        {this.colorCheck()}
                    <td>
                        {this.props.obj.unit}
                    </td>
                    <td>
                    <Link to={"/edit/"+ this.props.obj._id} className="btn btn-primary">Edit</Link>
                    </td>
                    <td>
                        <button onClick={this.delete} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
        )
    }
}

export default StockListTable