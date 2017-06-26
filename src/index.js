import './assets/styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App.jsx';
import About from './js/components/About.jsx';
import Contact from './js/components/Contact.jsx';
import NotFound from './js/components/NotFound.jsx';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group'

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.currentPage = location.pathname;

    this.pages = {
      '/': 0,
      '/about': 1,
      '/contact': 2
    }
  }


  getDirection() {
    let nextPage = location.pathname;
    let nextPageIndex = this.pages[nextPage];
    let currentPageIndex = this.pages[this.currentPage];

    this.currentPage = location.pathname;

    if (currentPageIndex < nextPageIndex) {
      return 'rtl'
    } else if (currentPageIndex > nextPageIndex){
      return 'ltr'
    }

    return null;
  }

  getAnimation() {
    let direction = this.getDirection();
    let calculatedAnimations = {};
    let animationPrefix = 'navigation';

    if (direction === 'rtl') {
      calculatedAnimations.enter = `${animationPrefix}-enter-rtl`;
      calculatedAnimations.enterActive = `${animationPrefix}-enter-active`;
      calculatedAnimations.leave = `${animationPrefix}-leave-rtl`;
      calculatedAnimations.leaveActive = `${animationPrefix}-leave-active`;
    } else if (direction === 'ltr'){
      calculatedAnimations.enter = `${animationPrefix}-enter-ltr`;
      calculatedAnimations.enterActive = `${animationPrefix}-enter-active`;
      calculatedAnimations.leave = `${animationPrefix}-leave-ltr`;
      calculatedAnimations.leaveActive = `${animationPrefix}-leave-active`;
    } else {
      calculatedAnimations.enter = `${animationPrefix}-enter-fade`;
      calculatedAnimations.enterActive = `${animationPrefix}-enter-active`;
      calculatedAnimations.leave = `${animationPrefix}-leave-fade`;
      calculatedAnimations.leaveActive = `${animationPrefix}-leave-active`;
    }

    return calculatedAnimations;
  }

  getAnimationSpeed() {
    let direction = this.getDirection();

    /*
     * Time values must be equal to $naviagtion-animation-time-cross-page and $naviagtion-animation-time-current-page @ variables.scss
     */
    const activePageAnimationSpeed = 600;
    const crossPageAnimationSpeed = 300;

    if (direction === null) {
      return activePageAnimationSpeed
    }

    return crossPageAnimationSpeed;
  }

  render() {
    return (
      <div id="container">
        <Router>
          <Route render={({ location }) => (
          <div>
            <div className='navigation'>
              <Link to='/'>Main</Link>
              <Link to='/about'>About</Link>
              <Link to='/contact'>Contact</Link>
            </div>
            <CSSTransitionGroup
              component="div"
              className="transition-container"
              transitionName={this.getAnimation()}
              transitionEnterTimeout={this.getAnimationSpeed()}
              transitionLeaveTimeout={this.getAnimationSpeed()}
              >
                <Switch key={location.key} location={location}>
                  <Route path='/' exact component={App}/>
                  <Route path='/about' component={About}/>
                  <Route path='/contact' component={Contact}/>
                  <Route component={NotFound}/>
                </Switch>
              </CSSTransitionGroup>
            </div>
          )}/>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('app'));