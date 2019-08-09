import React, { ReactPropTypes } from "react";
import { connect, useDispatch } from "react-redux";
import { Post } from "../types/Post";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";
import { startFetchPosts } from "../actions/posts";
import { startFetchComments } from "../actions/comments";
import { bindActionCreators } from "redux";
import { store } from "../store/configureStore";
import { RouteComponentProps } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { User } from "../types/User";
import { Comment } from "../types/Comment";
import AddCommentModalPage from "./AddCommentModalPage";
import { startFetchUsers } from "../actions/users";
import "../styles/PostDetailsPage.css";
import { MdArrowBack } from "react-icons/md";
import { ClipLoader } from "react-spinners";

interface PostDetailsPagePageProps {}

interface PostDetailsPagePageState {
    showComments: boolean;
}

interface RouteParams {
    userId: string;
    postId: string;
}

type Props = RouteComponentProps<RouteParams> &
    PostDetailsPagePageProps &
    LinkDispatchProps &
    LinkStateProp;

export class PostDetailsPage extends React.Component<
    Props,
    PostDetailsPagePageState
> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showComments: false
        };
    }
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.startFetchUsers();
        }
        if (
            this.props.posts.length === 0 ||
            this.props.posts[0].userId !==
                Number(this.props.match.params.userId)
        ) {
            this.props.startFetchPosts(this.props.match.params.userId);
        }
    }
    onCommentsFetch = () => {
        if (
            this.props.comments.length === 0 ||
            this.props.comments[0].postId !==
                Number(this.props.match.params.postId)
        ) {
            this.props.startFetchComments(this.props.match.params.postId);
        }
    };
    toggleComments = () => {
        this.onCommentsFetch();
        this.setState({
            showComments: !this.state.showComments
        });
    };
    render() {
        const post = this.props.posts.find(
            post => post.id === Number(this.props.match.params.postId)
        );
        const { comments } = this.props;
        const currentUser: User | undefined = this.props.users.find(
            user => user.id === Number(this.props.match.params.userId)
        );
        return (
            <Container>
                <Row className="miniHeader">
                    <Col md={1} className="text-center align-self-center">
                        <Link to={`/user/${this.props.match.params.userId}`}>
                            <span className="backButtonIcon">
                                <MdArrowBack />
                            </span>{" "}
                            <span className="backButtonText">Back</span>
                        </Link>
                    </Col>
                    <Col md={9} className="text-center align-self-center">
                        {currentUser ? (
                            <span>{currentUser.name}</span>
                        ) : (
                            <ClipLoader
                                css={`
                                    display: block;
                                    margin: 0 auto;
                                `}
                                sizeUnit={"px"}
                                size={20}
                                color={"#123abc"}
                                loading={currentUser}
                            />
                        )}
                    </Col>
                    <Col className="text-right align-self-center" />
                </Row>
                {post ? (
                    <div>
                        <Row>
                            <Col>
                                <h3>{post.title}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>{post.body}</p>
                            </Col>
                        </Row>
                        {!this.state.showComments ? (
                            <div>
                                <span
                                    className="spanLink"
                                    onClick={() => {
                                        this.toggleComments();
                                    }}
                                >
                                    Show comments
                                </span>
                            </div>
                        ) : (
                            <div>
                                <Row>
                                    <Col>
                                        <span
                                            className="spanLink"
                                            onClick={() => {
                                                this.toggleComments();
                                            }}
                                        >
                                            Hide comments
                                        </span>
                                    </Col>
                                    <Col className="text-right">
                                        <AddCommentModalPage
                                            postId={
                                                this.props.match.params.postId
                                            }
                                        />
                                    </Col>
                                </Row>
                                {!this.props.commentsLoading ? (
                                    <div>
                                        {comments.map(
                                            (comment: Comment, key: number) => (
                                                <div
                                                    key={key}
                                                    className="commentItem"
                                                >
                                                    <Row>
                                                        <Col className="font-weight-bold">
                                                            <p>
                                                                {comment.name}
                                                            </p>
                                                        </Col>
                                                        <Col className="text-right">
                                                            <p className="fakeLink">
                                                                {comment.email}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <p>
                                                                {comment.body}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <ClipLoader
                                        css={`
                                            display: block;
                                            margin: 0 auto;
                                        `}
                                        sizeUnit={"px"}
                                        size={100}
                                        color={"#123abc"}
                                        loading={this.props.commentsLoading}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <ClipLoader
                        css={`
                            display: block;
                            margin: 0 auto;
                        `}
                        sizeUnit={"px"}
                        size={100}
                        color={"#123abc"}
                        loading={post}
                    />
                )}
            </Container>
        );
    }
}

interface LinkStateProp {
    posts: Post[];
    postsLoading: boolean;
    users: User[];
    comments: Comment[];
    commentsLoading: boolean;
}

interface LinkDispatchProps {
    startFetchPosts: (userId: string) => void;
    startFetchComments: (postId: string) => void;
    startFetchUsers: () => void;
}

const mapStateToProps = (
    state: AppState,
    ownProps: PostDetailsPagePageProps
): LinkStateProp => ({
    posts: state.posts.posts,
    postsLoading: state.posts.loading,
    users: state.users.users,
    comments: state.comments.comments,
    commentsLoading: state.comments.loading
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>,
    ownProps: PostDetailsPagePageProps
): LinkDispatchProps => ({
    startFetchPosts: bindActionCreators(startFetchPosts, dispatch),
    startFetchComments: bindActionCreators(startFetchComments, dispatch),
    startFetchUsers: bindActionCreators(startFetchUsers, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetailsPage);
