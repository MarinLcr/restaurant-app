import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { createComment } from "../actions/index"

const formConfig = {
    form: "Create comment",
    fields: ['restaurantName', 'rating', 'text']
}

class CommentaireForm extends Component {
    render() {
        const { fields, handleSubmit } = this.props
        return (
            <div>
                <form onSubmit={handleSubmit(this.createComment.bind(this))}>
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

    createComment(comment) {
        this.props.createComment(comment);
        this.props.action()
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ createComment }, dispatch),
})

export default connect(null, mapDispatchToProps)(reduxForm(formConfig)(CommentaireForm))