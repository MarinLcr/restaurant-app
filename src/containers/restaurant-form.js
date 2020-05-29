import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { createPost } from "../actions/index"

const formConfig = {
    form: "Create restaurant",
    fields: ['restaurantName', 'address', 'lat', 'long', 'note', "avis"]
}

class CommentForm extends Component {
    render() {
        const { fields, handleSubmit } = this.props
        return (
            <div className="restau-form">
                <form onSubmit={handleSubmit(this.createPost.bind(this))}>
                    <div className="from-group">
                        <label>Nom de restaurant</label>
                        <input className="form-control" type="text" {...fields.restaurantName} />
                        <div></div>
                    </div>
                    <div className="form-group">
                        <label>Adresse</label>
                        <input className="form-control" type="textarea" {...fields.address} />
                        <div></div>
                    </div>
                    <div className="form-group">
                        <label>Lattitude</label>
                        <input className="form-control" type="textarea" placeholder={this.props.lat} {...fields.lat} />
                        <div></div>
                    </div>
                    <div className="form-group">
                        <label>Longitude</label>
                        <input className="form-control" type="textarea" {...fields.long} />
                        <div></div>
                    </div>
                    <div className="form-group">
                        <label>Note</label>
                        <input className="form-control" type="text" {...fields.note} />
                        <div></div>
                    </div>
                    <div className="form-group">
                        <label>Avis</label>
                        <input className="form-control" type="text" {...fields.avis} />
                        <div></div>
                    </div>
                    <button type="submit" className="btn btn-primary">Créer</button>
                </form>
            </div>
        )
    }

    createPost(post) {
        this.props.createPost(post);
        this.props.action()
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ createPost }, dispatch),
})

export default connect(null, mapDispatchToProps)(reduxForm(formConfig)(CommentForm)) 