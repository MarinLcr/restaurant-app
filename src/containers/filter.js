import React, { Component } from "react";
import { saveSelectValue } from '../actions/index'
import { saveSelectValueMore } from '../actions/index'
import { connect } from "react-redux"

class filterRestaurant extends Component {

    saveSelectValue = (e) => {
        let data = {}
        data = e.target.value

        this.props.saveSelectValue(data)
    }

    saveSelectValueMore = (e) => {
        let data = {}
        data = e.target.value

        this.props.saveSelectValueMore(data)
    }

    renderFirstStars() {
        return (
            <select defaultValue={'0'} onChange={this.saveSelectValue} id="first-select">
                <option value="0">0 ★</option>
                <option value="1">1 ★</option>
                <option value="2">2 ★</option>
                <option value="3">3 ★</option>
                <option value="4">4 ★</option>
                <option value="5">5 ★</option>
            </select>
        )
    }

    renderSecondStars() {
        return (
            <select defaultValue={'5'} onChange={this.saveSelectValueMore} id="second-select">
                <option value="0">0 ★</option>
                <option value="1">1 ★</option>
                <option value="2">2 ★</option>
                <option value="3">3 ★</option>
                <option value="4">4 ★</option>
                <option value="5">5 ★</option>
            </select>
        )
    }

    render() {
        return (
            <div className="filter_restaurant">
                {this.renderFirstStars()}
                {this.renderSecondStars()}
            </div>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        selectLess: store.selectReducer.select,
        selectMore: store.selectReducerMore.select
    }
}

const mapDispatchToProps = {
    saveSelectValue,
    saveSelectValueMore
}

export default connect(mapStateToProps, mapDispatchToProps)(filterRestaurant);

