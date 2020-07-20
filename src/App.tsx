import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Navbar from './components/Nav';
import home from './pages/home';
import login from './pages/login';

import { Provider } from 'react-redux';
// import store from './redux/store';
import configureStore from './redux/store';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme, { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const store = configureStore({});

const theme: Theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33c9dc',
      		main: '#00bcd4',
      		dark: '#008394',
      		contrastText: '#fff',
		},
		secondary: {
			light: '#ff6333',
			main: '#ff3d00',
			dark: '#b22a00',
			contrastText: '#fff',
		},
	},
	typography: {
		useNextVariant: true,
	},
} as ThemeOptions);

export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;

export const mustGetEnv = (obj: string): Undefinable<string> => {
	return process.env[`REACT_APP_${obj}`];
};

axios.defaults.baseURL = mustGetEnv('BASE_API_URL');

export class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<div>
						<Router>
							<Navbar />
							<div className="container">
								<Switch>
									<Route exact path="/" component={home}/>
									<Route exact path="/login" component={login}/>
								</Switch>
							</div>
						</Router>
					</div>
				</Provider>
			</MuiThemeProvider>
		)
	}
}

export default App;
