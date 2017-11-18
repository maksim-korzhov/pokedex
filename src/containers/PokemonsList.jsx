import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import { fetchPokemons, findPokemonByName, findPokemonByTypes, fetchByPage, fetchAllTypes } from "../actions";

import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

class PokemonsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: 1,
            totalItems: 1,
            itemsPerPage: 5,
            itemsOnPage: []
        };
    }

    componentDidMount() {
        this.props.fetchPokemons();
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.pokemonsList) {
            this.setState({
                isLoading: false,
                totalItems: nextProps.pokemonsList.length,
                itemsOnPage: this._setItemsOnPage(nextProps.pokemonsList, nextProps.currentPage),
                currentPage: nextProps.currentPage
            });
        }
    }

    _setItemsOnPage( list, currentPage = this.state.currentPage ) {
        const { itemsPerPage } = this.state;
        let offsetIndexStart = (currentPage - 1) * itemsPerPage;
        let offsetIndexEnd = currentPage * itemsPerPage;

        const itemsOnPage = list.slice(offsetIndexStart, offsetIndexEnd);

        return itemsOnPage;
    }

    _renderRows(items) {
        if (items.length === 0) {
            if( this.props.isLoaded ) {
                return <tr>
                    <td colSpan="5">Nothing to show</td>
                </tr>;
            }

            return <tr>
                <td colSpan="5">Loading...</td>
            </tr>;
        }


        return items.map(item => {
            const { data } = item;

            const imagePlaceholder = data.sprites.front_default ? data.sprites.front_default : "http://via.placeholder.com/96x96";

            return (
                <tr key={data.id}>
                    <td>#{data.id}</td>
                    <td>{data.name}</td>
                    <td>
                        <img src={imagePlaceholder} width="96" height="96"/>
                    </td>
                    <td>
                        {
                            data.types.map( typeItem => {
                                return <span key={typeItem.type.name} className={`badge badge-${typeItem.type.name}`}>{typeItem.type.name}</span>;
                            })
                        }
                    </td>
                    <td>
                        {
                            data.stats.map( (statItem, i) => {
                                return (
                                    <div key={statItem.stat.name}>
                                        <strong>{statItem.stat.name} ({statItem.base_stat} pnt)</strong>
                                        <div className="progress">
                                            <div className={`progress-bar progress-bar-striped progress-bar-${i}`} role="progressbar" style={{width: `${statItem.base_stat}%`}} aria-valuenow={statItem.base_stat} aria-valuemin="0" aria-valuemax="100" />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </td>
                </tr>
            );
        });
    }

    _onSearchHandle(name) {
        this.props.findPokemonByName(name);
    }

    _onSearchTypesHandle(types) {
        this.props.findPokemonByTypes(types);
    }

    render() {
        return (
            <main className="col-sm-12">
                <h1>Pokemons</h1>

                <SearchBar
                    filterTypesHandle={this._onSearchTypesHandle.bind(this)}
                    searchHandle={this._onSearchHandle.bind(this)}
                    types={this.props.typesList}
                />

                <div className="table-responsive table-bordered">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Picture</th>
                            <th>Type</th>
                            <th>Stats</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this._renderRows(this.state.itemsOnPage)}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    total={this.state.totalItems}
                    perPage={this.state.itemsPerPage}
                    currentPage={this.state.currentPage}
                    onPageClickHandler={this.props.fetchByPage}
                />

                <div className={`preloader ${ this.state.isLoading ? "" : "hide"}`}>
                    <div className="preloaderText"><span className="preloaderPicture" /> Loading...</div>
                </div>
            </main>
        );
    }
}

function mapStateToProps({pokemons}) {
    const pokemonsList = (pokemons.isSearching || pokemons.isSearchingByTypes) ? pokemons.searchList : pokemons.pokemonsList;
    return {
        pokemonsList,
        isLoaded: pokemons.isLoaded,
        currentPage: pokemons.currentPage,
        typesList: pokemons.typesList
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPokemons, findPokemonByName, findPokemonByTypes, fetchByPage, fetchAllTypes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsList);