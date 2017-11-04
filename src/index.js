import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './containers/App'

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <HashRouter>
                <Component />
            </HashRouter>
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(App)

// Webpack Hot Module Replacement API
if(module.hot) {
    module.hot.accept('./containers/App', () => {
        const NextApp = require('./containers/App').default
        render(NextApp)
    })
}