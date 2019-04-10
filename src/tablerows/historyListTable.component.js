import React from 'react'

class HistoryList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            history_log: [],
            history_log_status: [],
            date: []
        }
    }

    render() {
        return (
                <tr>
                    <td>
                        {this.props.obj.date}
                    </td>
                    <td>
                        {this.props.obj.history_log}
                    </td>
                    <td>
                        {this.props.obj.history_log_status}
                    </td>
                </tr>
        )
    }
}

export default HistoryList