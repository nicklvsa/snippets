import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import SnippetBtn from './SnippetBtn';

export class Nav extends Component {
    public static propTypes = {};

    render() {
        const { authed }: any = this.props;
        return (
            <AppBar position="fixed">
                <ToolBar className="nav-container">
                    {authed ? (
                        <Fragment>
                            <Link to="/">
                                <SnippetBtn tip="Home">
                                    <HomeIcon color="primary" />
                                </SnippetBtn>
                            </Link>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                        </Fragment>
                    )}
                </ToolBar>
            </AppBar>
        )
    }
}

Nav.propTypes = {
    authed: PropTypes.bool.isRequired,
};

const mapState = (state: any) => ({
    authed: state.user.authed,
});

export default connect(mapState)(Nav);