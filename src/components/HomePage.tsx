import React from "react";
import { connect, useDispatch } from "react-redux";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";
import { startFetchUsers } from "../actions/users";
import { bindActionCreators } from "redux";
import { store } from "../store/configureStore";
import { User } from "../types/User";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../styles/HomePage.css";
import { Link, RouteComponentProps } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface HomePageProps {}

interface HomePageState {}

type Props = HomePageProps & LinkDispatchProps & LinkStateProp;

export class HomePage extends React.Component<Props, HomePageState> {
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.startFetchUsers();
        }
    }
    onFetch = () => {
        this.props.startFetchUsers();
    };
    render() {
        const { users } = this.props;
        return (
            <div>
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
                    <Container>
                        <Row>
                            {users.map((user: any, key: number) => (
                                <Col md={3} key={key}>
                                    <Col md={12} className="card">
                                        <div>
                                            <p>
                                                <span className="simpleText">
                                                    {user.name}
                                                </span>
                                            </p>
                                            <p>
                                                <span className="simpleText fakeLink">
                                                    {user.email}
                                                </span>
                                                <span className="simpleText fakeLink">
                                                    {user.phone}
                                                </span>
                                                <span className="simpleText fakeLink">
                                                    {user.website}
                                                </span>
                                            </p>
                                            <p>
                                                <span className="simpleText">
                                                    {user.company.name}
                                                </span>
                                                <span className="simpleText">
                                                    {user.company.catchPhrase}
                                                </span>
                                                <span className="simpleText font-weight-bold">
                                                    {user.company.bs}
                                                </span>
                                            </p>
                                        </div>
                                        <Link
                                            to={`user/${user.id}`}
                                            className="text-center"
                                        >
                                            <Button
                                                variant="secondary"
                                                size="lg"
                                                className="detailsButton"
                                            >
                                                Details
                                            </Button>
                                        </Link>
                                    </Col>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                )}
            </div>
        );
    }
}

interface LinkStateProp {
    loading: boolean;
    users: User[];
    error: any;
}

interface LinkDispatchProps {
    startFetchUsers: () => void;
}

const mapStateToProps = (
    state: AppState,
    ownProps: HomePageProps
): LinkStateProp => ({
    loading: state.users.loading,
    users: state.users.users,
    error: state.users.error
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>,
    ownProps: HomePageProps
): LinkDispatchProps => ({
    startFetchUsers: bindActionCreators(startFetchUsers, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
