import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ""
        };
    }

    _handleInputChange(e) {
        this.props.searchHandle(e.target.value);


        this.setState({
            value: e.target.value
        });
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <input
                        type="search"
                        className="form-control form-control-lg"
                        id="search"
                        placeholder="Search pokemon by name"
                        value={this.state.value}
                        onChange={this._handleInputChange.bind(this)}
                    />
                </div>
            </form>
        );
    }
}

export default SearchBar;