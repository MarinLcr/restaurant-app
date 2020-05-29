import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { createNewComment } from "../actions/index"

const formConfig = {
    form: "Create new comment",
    fields: ['restaurantName', 'rating', 'text']
}

class CommentaireNewForm extends Component {
    render() {
        const { fields, handleSubmit } = this.props
        return (
            <div>
                <form onSubmit={handleSubmit(this.createNewComment.bind(this))}>
                    <div className="from-group">
                        <label>Nom de restaurant</label>
                        <input className="form-control" type="text" {...fields.restaurantName} />
                        <div></div>
                    </div>
                    <div className="from-group">
                        <label>Note</label>
                        <input className="form-control" type="text" {...fields.rating} />
                        <div></div>
                    </div>
                    <div className="form-group">
                        <label>Avis</label>
                        <input className="form-control" type="textarea" {...fields.text} />
                        <div></div>
                    </div>
                    <button type="submit" className="btn btn-primary">Créer</button>
                </form>
            </div>
        )
    }

    createNewComment(comment) {
        this.props.createNewComment(comment);
        this.props.action()
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ createNewComment }, dispatch),
})

export default connect(null, mapDispatchToProps)(reduxForm(formConfig)(CommentaireNewForm))