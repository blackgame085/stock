import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AddUnit extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeUnitName = this.onChangeUnitName.bind(this)
        this.onChangeUnitNumber = this.onChangeUnitNumber.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            unit_name: '',
            unit_number: ''
        }
    }

    onChangeUnitName(e) {
        this.setState({
            unit_name: e.target.value
        })
    }
    onChangeUnitNumber(e) {
        this.setState({
            unit_number: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault()
        console.log(`Item Name: ${this.state.unit_name}`)
        console.log(`Quantity: ${this.state.unit_number}`)


        const newUnit = {
            unit_name: this.state.unit_name,
            unit_number: this.state.unit_number,
        }

        axios.post('http://localhost:4000/unit/addUnit', newUnit)
        .then(
            res => console.log(res.data)
        )

        this.props.history.push('/stock')
    }

    render() {
        return (
            <div>
                <h3>Add New Unit</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Unit Name: </label>
                        <input 
                        type="text" 
                        required="required"
                        className="form-control"
                        value={this.state.unit_name}
                        onChange={this.onChangeUnitName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Add Unit Number (กรัม/มิลลิลิตร): </label>
                        <input 
                        type="number" 
                        required="required"
                        className="form-control" 
                        value={this.state.unit_number}
                        onChange={this.onChangeUnitNumber}
                        />
                    </div>
                    <div className="form group">
                        <Link to={"/stock"} className="btn btn-primary" style={{marginRight: 30}}>Back</Link>
                        <input type="submit" value="Register Unit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}