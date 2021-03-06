import React, { Component } from 'react'
import { Style } from 'radium'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'

// Pages
import BlogDetail from 'pages/blog/detail'
import BlogList from 'pages/blog/list'
import CfP from 'pages/cfp'
import CfS from 'pages/cfs'
import CfSDetail from 'pages/cfs/detail'
import CfSList from 'pages/cfs/list'
import CoC from 'pages/coc'
import Dashboard from 'pages/dashboard'
import Gallery from 'pages/gallery'
import Landing from 'pages/landing'
import Login from 'pages/login'
import NoPage from 'pages/nopage'
import Schedule from 'pages/talk/schedule'

import ResolutionContext from 'resolution'
import theme from 'theme'
import store from 'store'
import reset from 'reset'


export default class App extends Component {
  state = {
    height: window.innerHeight,
    width: window.innerWidth,
  }

  componentWillMount() {
    store.event.fetchAll()
    window.onresize = () => {
      this.setState({ height: window.innerHeight })
      this.setState({ width: window.innerWidth })
    }
  }

  render() {
    const context = {
      height: this.state.height,
      width: this.state.width,
    }
    return (
      <ResolutionContext.Provider value={context}>
        <Style rules={reset} />
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/blog" component={BlogList} />
              <Route exact path="/blog/:year/:month/:day/:slug" component={BlogDetail} />
              <Route exact path="/cfp" component={CfP} />
              <Route exact path="/cfs" component={CfS} />
              <Route exact path="/cfs/:id" component={CfSDetail} />
              <Route exact path="/:year/cfs" component={CfSList} />
              <Route exact path="/:year/cfs/:page" component={CfSList} />
              <Route exact path="/coc" component={CoC} />
              <Route exact path="/:year/gallery" component={Gallery} />
              <Route exact path="/:year/schedule" component={Schedule} />
              <Route exact path="/landing" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route path="*" component={NoPage} />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </ResolutionContext.Provider>
    )
  }
}
