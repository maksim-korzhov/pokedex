import React, {Component} from "react";

class Pagination extends Component {
    constructor(props) {
        super(props);

        const { total } = this.props;

        this.state = {
            prevPage: false,
            nextPage: false,
            currentPage: 1,
            totalPages: total
        };
    }

    _setCurrentPage(number) {
        const { onPageClickHandler } = this.props;

        this.setState({
            currentPage: number
        });

        onPageClickHandler(number);
    }

    _showPageItem(number) {
        return <li key={number} className={`page-item ${ number === this.state.currentPage ? "active" : ""}`}>
            <span className="page-link" onClick={() => this._setCurrentPage(number)}>{number}</span>
        </li>;
    }

    _showPages(total) {
        return Array.from({ length: total }).map( (item, pageNumber) => {
            return this._showPageItem(++pageNumber);
        });
    }


    render() {
        const { total, perPage } = this.props;
        const currentPage = this.state.currentPage;

        const totalPages = Math.ceil(parseInt(total) / parseInt(perPage));
        const prevPage = (currentPage - 1) > 0 ? (currentPage - 1) : 1;
        const nextPage = (currentPage + 1) < totalPages ? (currentPage + 1) : totalPages;

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className={`page-item ${ this.state.currentPage == 1 ? "disabled":""}`}>
                        <span className="page-link" tabIndex="-1" onClick={() => this._setCurrentPage(prevPage)}>Previous</span>
                    </li>
                    {this._showPages(totalPages)}
                    <li className={`page-item ${ this.state.currentPage == totalPages ? "disabled":""}`}>
                        <span className="page-link" onClick={() => this._setCurrentPage(nextPage)}>Next</span>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;