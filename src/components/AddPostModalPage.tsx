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
import "../styles/AddPostModalPage.css";
import { startAddComment } from "../actions/comments";
import { startAddPost } from "../actions/posts";
import { MdAddCircle } from "react-icons/md";

interface AddPostModalPageProps {
    userId: string;
}

interface AddPostModalPageState {
    showModal: boolean;
    title: string;
    body: string;
}

type Props = AddPostModalPageProps & LinkDispatchProps & LinkStateProp;

export class AddPostModalPage extends React.Component<
    Props,
    AddPostModalPageState
> {
    validator: SimpleReactValidator;
    validatorOptions: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            showModal: false,
            title: "",
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
    addPost = () => {
        if (this.validator.allValid()) {
            this.props.startAddPost({
                title: this.state.title,
                body: this.state.body,
                userId: this.props.userId
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
            title: "",
            body: ""
        });
    };
    handleFormChange = (event: any) => {
        if (event.target.id === "titleContent") {
            this.setState({ title: event.target.value });
        } else if (event.target.id === "bodyContent") {
            this.setState({ body: event.target.value });
        }
    };
    render() {
        this.validator.purgeFields();
        return (
            <div>
                <MdAddCircle
                    className="addPostButton"
                    onClick={() => {
                        this.toggleModal();
                    }}
                />

                <Modal show={this.state.showModal} onHide={this.toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="titleContent">
                                <Form.Label column sm={2}>
                                    Title
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        required
                                        onChange={this.handleFormChange}
                                    />
                                    {this.validator.message(
                                        "title",
                                        this.state.title,
                                        "required",
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
                        <Button variant="primary" onClick={this.addPost}>
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
    startAddPost: (postData: {
        title: string;
        body: string;
        userId: string;
    }) => void;
}

const mapStateToProps = (
    state: AppState,
    ownProps: AddPostModalPageProps
): LinkStateProp => ({
    loading: state.comments.loading,
    error: state.comments.error
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>,
    ownProps: AddPostModalPageProps
): LinkDispatchProps => ({
    startAddPost: bindActionCreators(startAddPost, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPostModalPage);
