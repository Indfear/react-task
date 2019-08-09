import React, { ReactPropTypes } from "react";
import { connect, useDispatch } from "react-redux";
import { Post } from "../types/Post";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";
import { startFetchPosts, startDeletePost } from "../actions/posts";
import { bindActionCreators } from "redux";
import { store } from "../store/configureStore";
import { RouteComponentProps } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../styles/PostsPage.css";
import { User } from "../types/User";
import AddPostModalPage from "./AddPostModalPage";
import { startFetchUsers } from "../actions/users";
import { MdArrowBack, MdDeleteForever, MdChevronRight } from "react-icons/md";
import { ClipLoader } from "react-spinners";

interface PostsPageProps {
    id?: string;
    color?: string;
}

interface PostsPageState {}

interface RouteParams {
    userId: string;
}

type Props = RouteComponentProps<RouteParams> &
    PostsPageProps &
    LinkDispatchProps &
    LinkStateProp;

export class PostsPage extends React.Component<Props, PostsPageState> {
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
    onFetch = () => {
        this.props.startFetchPosts(this.props.match.params.userId);
    };
    onDelete = (postId: string) => {
        this.props.startDeletePost(postId);
    };
    render() {
        const { posts } = this.props;
        const currentUser: User | undefined = this.props.users.find(
            user => user.id === Number(this.props.match.params.userId)
        );
        return (
            <Container>
                <Row className="miniHeader">
                    <Col md={1} className="text-center align-self-center">
                        <Link to={`/`}>
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
                    <Col className="text-right align-self-center">
                        <AddPostModalPage
                            userId={this.props.match.params.userId}
                        />
                    </Col>
                </Row>
                {this.props.loading ? (
                    <ClipLoader
                        css={`
                            display: block;
                            margin: 0 auto;
                        `}
                        sizeUnit={"px"}
                        size={100}
                        color={"#123abc"}
                        loading={this.props.loading}
                    />
                ) : (
                    <div>
                        <ListGroup>
                            {posts.map((post: any, key: number) => (
                                <Link
                                    className="postLink"
                                    key={key}
                                    to={`/user/${
                                        this.props.match.params.userId
                                    }/${post.id}`}
                                >
                                    <ListGroup.Item className="listItem">
                                        <Row>
                                            <Col
                                                md={1}
                                                className="align-self-center"
                                            >
                                                <MdDeleteForever
                                                    onClick={(e: any) => {
                                                        e.preventDefault();
                                                        this.onDelete(post.id);
                                                    }}
                                                    className="deleteButton"
                                                />
                                            </Col>
                                            <Col
                                                md={10}
                                                className="align-self-center"
                                            >
                                                <span>{post.title}</span>
                                            </Col>
                                            <Col
                                                md={1}
                                                className="align-self-center"
                                            >
                                                <MdChevronRight className="miniArrowIcon" />
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </Link>
                            ))}
                        </ListGroup>
                    </div>
                )}
            </Container>
        );
    }
}

interface LinkStateProp {
    loading: boolean;
    posts: Post[];
    error: any;
    users: User[];
}

interface LinkDispatchProps {
    startFetchPosts: (userId: string) => void;
    startDeletePost: (postId: string) => void;
    startFetchUsers: () => void;
}

const mapStateToProps = (
    state: AppState,
    ownProps: PostsPageProps
): LinkStateProp => ({
    loading: state.posts.loading,
    posts: state.posts.posts,
    error: state.posts.error,
    users: state.users.users
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>,
    ownProps: PostsPageProps
): LinkDispatchProps => ({
    startFetchPosts: bindActionCreators(startFetchPosts, dispatch),
    startDeletePost: bindActionCreators(startDeletePost, dispatch),
    startFetchUsers: bindActionCreators(startFetchUsers, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsPage);
