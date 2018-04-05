import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import LoginPage from "./containers/LoginPage"
import GroupIndex from "./containers/GroupIndexPage"
import StudentCard from "./components/StudentCard"
import GroupOverview from "./containers/GroupOverview"
import {logout} from "./actions/users"
import {connect} from "react-redux"
import StudentPage from "./containers/StudentPage"
const { Header, Content, Footer } = Layout

class App extends Component {
  render() {
    return (
      <Router>
        <Layout
          className="layout"
          style={{minHeight:'100vh'}}
        >
          <Header>
            <div
              className="logout"
              style={{
                height: '63px',
                width: '80px',
                float: 'right',
                color: 'white',
                textAlign: 'center'
              }}
              onClick={this.props.logout}
            >
              Log out
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">Student Evaluations</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '50px 50px' }}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/classes" component={GroupIndex} />
            <Route exact path="/classes/:id" component={GroupOverview} />
            <Route exact path="/students/:id" component={StudentPage} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Student Evaluation tool for Codaisseur
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default connect(null, {logout})(App);
