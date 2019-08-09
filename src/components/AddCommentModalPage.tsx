import React from "react";
import { connect, useDispatch } from "react-redux";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";
import { bindActionCreators } from "redux";
import { store } from "../store/configureStore";
import { User } from "../types/User";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link, RouteComponentProps } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import "../styles/AddCommentModalPage.css";
import { startAddComment } from "../actions/comments";

interface AddCommentModalPageProps {
    postId: string;
}

interface AddCommentModalPageState {
    showModal: boolean;
    name: string;
    email: string;
    body: string;
}

type Props = AddCommentModalPageProps & LinkDispatchProps & LinkStateProp;

export class AddCommentModalPage extends React.Component<
    Props,
    AddCommentModalPageState
> {
    validator: SimpleReactValidator;
    validatorOptions: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            showModal: false,
            name: "",
            email: "",
            body: ""
        };
        this.validatorOptions = {
            element: (message: any, className: any) => (
                <div className={className}>{message}</div>
            ),
            className: "errorText"
        };
        this.validator = new SimpleReactValidator(this.validatorOptions);
    }
    addComment = () => {
        if (this.validator.allValid()) {
            this.props.startAddComment({
                name: this.state.name,
                email: this.state.email,
                body: this.state.body,
                postId: this.props.postId
            });
            this.toggleModal();
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };
    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
            name: "",
            email: "",
            body: ""
        });
    };
    handleFormChange = (event: any) => {
        if (event.target.id === "nameContent") {
            this.setState({ name: event.target.value });
        } else if (event.target.id === "emailContent") {
            this.setState({ email: event.target.value });
        } else if (event.target.id === "bodyContent") {
            this.setState({ body: event.target.value });
        }
    };
    render() {
        this.validator.purgeFields();
        return (
            <div>
                <span
                    className="spanLink"
                    onClick={() => {
                        this.toggleModal();
                    }}
                >
                    Add comment
                </span>

                <Modal show={this.state.showModal} onHide={this.toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="nameContent">
                                <Form.Label column sm={2}>
                                    Name
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        required
                                        onChange={this.handleFormChange}
                                    />
                                    {this.validator.message(
                                        "name",
                                        this.state.name,
                                        "required",
                                        this.validatorOptions
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="emailContent">
                                <Form.Label column sm={2}>
                                    Email
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        required
                                        onChange={this.handleFormChange}
                                    />
                                    {this.validator.message(
                                        "email",
                                        this.state.email,
                                        "required|email",
                                        this.validatorOptions
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="bodyContent">
                                <Form.Label column sm={2}>
                                    Body
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        onChange={this.handleFormChange}
                                    />
                                    {this.validator.message(
                                        "body",
                                        this.state.body,
                                        "required",
                                        this.validatorOptions
                                    )}
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleModal}>
                            Cencel
                        </Button>
                        <Button variant="primary" onClick={this.addComment}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

interface LinkStateProp {
    loading: boolean;
    error: any;
}

interface LinkDispatchProps {
    startAddComment: (commentData: {
        name: string;
        email: string;
        body: string;
        postId: string;
    }) => void;
}

const mapStateToProps = (
    state: AppState,
    ownProps: AddCommentModalPageProps
): LinkStateProp => ({
    loading: state.comments.loading,
    error: state.comments.error
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>,
    ownProps: AddCommentModalPageProps
): LinkDispatchProps => ({
    startAddComment: bindActionCreators(startAddComment, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCommentModalPage);
