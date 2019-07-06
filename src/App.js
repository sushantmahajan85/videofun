import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Dashboard from './Components/Dash'
import Auth from './Components/Auth'
import Arena from './Components/Arena'

import AuthContext from './Context/AuthContext'

// Styling
import './styles/sass/main.scss'

export default class App extends Component {

    state = {
        token: null,
        client: null,
        userId: null
    }

    login = (token, userId) => {
        this.setState({ token, userId })
    }

    setClientInfo = client => {
        this.setState({ client })
    }

    logout = () => {
        this.setState({
            token: null,
            client: null
        })
    }

    componentDidMount = () => {
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')
        if (this.state.token == null && (token !== null && userId !== null)) {
            this.login(token, userId)
        }
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    <BrowserRouter>
                        <React.Fragment>
                            <AuthContext.Provider
                                value={{
                                    token: this.state.token,
                                    userId: this.state.userId,
                                    client: this.state.client,
                                    login: this.login,
                                    logout: this.logout
                                }}>
                                <Switch>
                                    {!this.state.token ? (<Redirect from='/dashboard' to='/auth' />) : null}
                                    {this.state.token ? (<Redirect from='/auth' to='/dashboard' />) : null}
                                    <Route exact path='/auth' component={Auth} />
                                    <Route eaxct path='/dashboard' component={Dashboard} />
                                    <Route eaxct path='/arena' component={Arena} />
                                </Switch>
                            </AuthContext.Provider>
                        </React.Fragment>
                    </BrowserRouter>
                </React.Fragment>
            </div>
        )
    }
}
