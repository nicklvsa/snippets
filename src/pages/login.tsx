import React, { Component, Fragment, SyntheticEvent } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { mustGetEnv } from '../App';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StoreModel } from '../redux/store';
import { pushLocalError } from '../redux/actions/dataActions';
import { Typography, Grid, TextField, Button, CircularProgress } from '@material-ui/core';

interface GoogleOAuthSuccess {
    accessToken: string;
        googleId: string;
        profileObj: {
        email: string;
        imageUrl: string;
        name: string;
    };
    tokenObj: {
        access_token: string;
        id_token: string;
        token_type: string;
        expires_at: number;
    }
}

interface GoogleOAuthError {
    error?: string;
}

interface LoginState {
    usingPlainText: boolean;
    email: string;
    password: string;
    loading: boolean;
    errors: string;
};

const mapState = (state: StoreModel) => ({
    classes: state.classes,
    user: state.user,
    ui: state.ui,
});

const mapActions = (dispatch: any) => ({
    pushLocalError: (error: string) => dispatch(pushLocalError(error)),
})

type LoginProps = ReturnType<typeof mapState> & ReturnType<typeof mapActions>;

class login extends Component<LoginProps, LoginState> {
    public static propTypes = {};

    constructor(props: LoginProps) {
        super(props);

        this.state = {
            usingPlainText: false,
            loading: false,
            errors: '',
            email: '',
            password: '',
        };
    
        this.handleLoginError = this.handleLoginError.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleLoginLoading = this.handleLoginLoading.bind(this);
        this.handlePlainUsernameChange = this.handlePlainUsernameChange.bind(this);
        this.handlePlainPasswordChange = this.handlePlainPasswordChange.bind(this);
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.errors !== this.state.errors) {
            this.setState({errors: this.state.errors});
        }

        if (prevState.loading !== this.state.loading) {
            this.setState({loading: this.state.loading});
        }

        if (prevState.email !== this.state.email) {
            this.setState({
                usingPlainText: this.state.email.length > 0 || this.state.password.length > 0
            });
        }

        if (prevState.password !== this.state.password) {
            this.setState({
                usingPlainText: this.state.email.length > 0 || this.state.password.length > 0
            });
        }
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        if (nextProps.ui.errors !== prevState.errors) {
            return {
                errors: nextProps.ui.errors,
            };
        } else {
            return null;
        }
    }

    render() {
        const clientID = mustGetEnv('GOOGLE_CLIENT_ID');
        const { ui: { loading }, user: { authed } } = this.props;
        const { errors, usingPlainText } = this.state;

        return (
            <Fragment>
                <Grid container>
                    <Grid item sm />
                    <Grid item sm>
                        <img src="" alt="Snippets" className="login-form-img"/>
                        <Typography variant="h2" className="login-form-page-title">
                            Login
                        </Typography>
                        <form noValidate onSubmit={this.handlePlainSubmit} className="login-form">
                            <TextField type="email" id="email" name="email" label="Email: " className="login-form-text-field" value={this.state.email} onChange={this.handlePlainUsernameChange} fullWidth />
                            <TextField type="password" id="password" name="password" label="Password: " className="login-form-text-field" value={this.state.password} onChange={this.handlePlainPasswordChange} fullWidth />
                            <div className="buttons-container">
                                {authed ? (
                                    <GoogleLogout
                                        clientId={`${clientID}`}
                                        buttonText="Logout" 
                                        onLogoutSuccess={this.handleGoogleLogout}
                                        className="google-login-button" 
                                    />
                                ) : (
                                    <GoogleLogin
                                        clientId={`${clientID}`}
                                        buttonText="Login with Google"
                                        onSuccess={this.handleLoginSuccess}
                                        onFailure={this.handleLoginError}
                                        cookiePolicy={'single_host_origin'}
                                        className="google-login-button"
                                        disabled={loading || usingPlainText}
                                        onRequest={this.handleLoginLoading}
                                    />
                                )}
                                <Button size="medium" type="submit" variant="contained" color="primary" className="login-form-submit" disabled={loading}>
                                    Login {loading && (
                                        <CircularProgress size={30} className="login-form-progress" />
                                    )}
                                </Button>
                            </div>
                        </form>
                        <div className="error-container">
                            {errors && errors.length > 0 && (
                                <p className="err-msg">
                                    {errors}
                                </p>
                            )}
                        </div>
                    </Grid>
                    <Grid item sm />
                </Grid>
            </Fragment>
        )
    }

    handlePlainSubmit(evt: any) {
        
    }

    handlePlainUsernameChange(evt: SyntheticEvent) {
        this.setState({
            email: (evt.target as any).value
        });

        this.setState({
            usingPlainText: this.state.email.length > 0
        });
    }

    handlePlainPasswordChange(evt: SyntheticEvent) {
        this.setState({
            password: (evt.target as any).value
        });

        this.setState({
            usingPlainText: this.state.password.length > 0
        });
    }

    handleLoginLoading() {
        this.setState({
            loading: true,
        });
    }

    handleLoginSuccess(response: any) {
        const formatted: GoogleOAuthSuccess = response as GoogleOAuthSuccess;

        alert(formatted.tokenObj.id_token);
    }

    handleLoginError(response: GoogleOAuthError) {
        this.setState({
            loading: false,
        });
        if (response.error) {
            this.props.pushLocalError(response.error);
        }
    }

    handleGoogleLogout() {
        
    }

}

login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    pushLocalError: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

export default connect(mapState, mapActions)(login);