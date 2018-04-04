import React, { Component } from 'react';
import './App.css';
import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout

class App extends Component {
  render() {
    return (
      <Layout
        className="layout"
        style={{minHeight:'100vh'}}
      >
        <Header>
          <div/>
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

        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Student Evaluation tool for Codaisseur
        </Footer>
      </Layout>
    );
  }
}

export default App;
