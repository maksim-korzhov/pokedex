import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            typesFilter: []
        };
    }

    _handleInputChange(e) {
        this.props.searchHandle(e.target.value);

        this.setState({
            value: e.target.value
        });
    }

    _handleCheckboxChanged(e) {
        const {typesFilter} = this.state;
        const {name, checked} = e.target;
        const pos = typesFilter.indexOf(name);

        if (checked && pos === -1) {
            typesFilter.push(name);
        } else if (!checked && pos !== -1) {
            typesFilter.splice(pos, 1);
        }

        this.props.filterTypesHandle(typesFilter);

        this.setState({
            typesFilter
        });
    }

    _showTags() {
        const types = this.props.types;

        if (types.length === 0) return false;

        return (
            <div className="form-group">
                <label htmlFor="">or filter by tags:</label><br/>

                <div className="types" onChange={this._handleCheckboxChanged.bind(this)}>
                    {types.map(type => {
                        return (
                            <label key={type} className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" name={type}/>
                                <span className="custom-control-indicator"></span>
                                <span className="custom-control-description"><span
                                    className={`badge badge-${type}`}>{type}</span></span>
                            </label>
                        );
                    })}
                </div>
            </div>
        );
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="search">Search by name</label>
                    <input
                        type="search"
                        className="form-control"
                        id="search"
                        placeholder="Start typing pokemon's name"
                        value={this.state.value}
                        onChange={this._handleInputChange.bind(this)}
                    />
                </div>
                {this._showTags()}
            </form>
        );
    }
}

export default SearchBar;