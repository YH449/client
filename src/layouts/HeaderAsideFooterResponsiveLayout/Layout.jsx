/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/styled-menu';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { enquire } from 'enquire-js';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Logo from '@components/logo/components/Logo';
import './scss/light.scss';
import './scss/dark.scss';

import { SessionContext } from '@api/Application';
import NoticeUtils from '@utils/NoticeUtils';
import IconUtils from '@api/utils/IconUtils';
import UserLoginDialog from '@components/framework/dialog/UserLoginDialog';
import EventUtils from '@utils/EventUtils';


// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
const theme = typeof THEME === 'undefined' ? 'light' : THEME;

@withRouter
export default class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    const asideMenuConfig = this.getAsideMenuConfig();
    const openKeys = this.getOpenKeys(asideMenuConfig);
    this.state = {
      openKeys,
      collapse: false,
      openDrawer: false,
      isScreen: undefined,
      asideMenuConfig: asideMenuConfig,
      dialogVisible: false
    };
    this.openKeysCache = openKeys;
  }

  
  componentDidMount() {
    this.enquireScreenRegister();
    EventUtils.getEventEmitter().on(EventUtils.getEventNames().TokenError, () => this.setState({dialogVisible: true}));

  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    let collapse;
    if (type === 'isMobile') {
      collapse = false;
    } else if (type === 'isTablet') {
      collapse = true;
    } else {
      collapse = this.state.collapse;
    }

    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
          collapse,
        });
      },
      unmatch: () => {
        // handler unmatched
      },
    };

    return handler;
  };

  /**
   * 左侧菜单收缩切换
   */
  toggleCollapse = () => {
    const { collapse } = this.state;
    const openKeys = !collapse ? [] : this.openKeysCache;

    this.setState({
      collapse: !collapse,
      openKeys,
    });
  };

  /**
   * 响应式通过抽屉形式切换菜单
   */
  toggleMenu = () => {
    const { openDrawer } = this.state;
    this.setState({
      openDrawer: !openDrawer,
    });
  };

  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
    this.openKeysCache = openKeys;
  };

  getAsideMenuConfig = () => {
    let sessionContext = SessionContext.getSessionContext();
    if (sessionContext == undefined) {
      NoticeUtils.showNotice("请先登陆");
      this.props.history.push('/');
      return;
    }
    return SessionContext.getAuthorities();
  }

  /**
   * 响应式时点击菜单进行切换
   */
  onMenuClick = () => {
    this.toggleMenu();
  };

  /**
   * 获取当前展开的菜单项
   */
  getOpenKeys = (asideMenuConfig) => {
    const { match } = this.props;
    const {parentRrn} = match.params;
    let openKeys = [];
    if (Array.isArray(asideMenuConfig)) {
      asideMenuConfig.forEach((item, index) => {
        if (item.objectRrn == parentRrn) {
          openKeys = [`${index}`];
        }
      });
    }
    return openKeys;
  };

  closeUserLoginDialog = () => {
    this.setState({dialogVisible: false})
  }

  createUserLoginDialog = () => {
    return <UserLoginDialog ref={this.formRef} object={{}} onOk= {this.closeUserLoginDialog} visible={this.state.dialogVisible} tableRrn={30773} table={{fields:[]}}/>
  }

  createMenu = (item, parentFlag) => {
    const linkProps = {};
    let component = undefined;
    if (item.newWindow) {
      component = <a href={item.path} target = '_blank'>  {item.name}</a>
      
    } else {
      let query = {
          pathname: item.path,
          query: item.tableRrn
      }
      linkProps.to = query;
      component =  <Link {...linkProps}>
      {item.icon ? IconUtils.buildIcon(item.icon) : null}
        {!parentFlag ? <span style={{marginLeft:"3px"}}></span> : <span className="ice-menu-collapse-hide" style={{marginLeft:"10px", fontSize:"14px"}}></span>}
      {item.name}
      </Link>
    }
    return (
      <MenuItem key={item.path}>
        {component}
      </MenuItem>
    );
  }

  render() {    
    const { location = {} } = this.props;
    const { pathname } = location;
    return (
      !this.state.asideMenuConfig ? "" : 
      <div>
        <Layout
          style={{ minHeight: '100vh' }}
          className={cx(
            `ice-design-header-aside-footer-responsive-layout-${theme}`,
            {
              'ice-design-layout': true,
            }
          )}
        >
          <Header
            theme={theme}
            isMobile={this.state.isScreen !== 'isDesktop' ? true : undefined}
          />
          <Layout.Section>
            {this.state.isScreen === 'isMobile' && (
              <a className="menu-btn" onClick={this.toggleMenu}>
                {IconUtils.buildIcon("category")}
              </a>
            )}
            {this.state.openDrawer && (
              <div className="open-drawer-bg" onClick={this.toggleMenu} />
            )}
            <Layout.Aside
              width="auto"
              theme={theme}
              className={cx('ice-design-layout-aside', {
                'open-drawer': this.state.openDrawer,
              })}
            >
              {/* 侧边菜单项 begin */}
              {this.state.isScreen !== 'isMobile' && (
                <a className="collapse-btn" onClick={this.toggleCollapse}>
                  {IconUtils.buildIcon(this.state.collapse ? 'arrow-right' : 'arrow-left')}
                </a>
              )}
              {this.state.isScreen === 'isMobile' && <Logo />}
              <Menu
                style={{ width: this.state.collapse ? 60 : 200 }}
                inlineCollapsed={this.state.collapse}
                mode="inline"
                selectedKeys={[pathname]}
                openKeys={this.state.openKeys}
                defaultSelectedKeys={[pathname]}
                onOpenChange={this.onOpenChange}
                onClick={this.onMenuClick}
              > 
                {Array.isArray(this.state.asideMenuConfig) &&
                  this.state.asideMenuConfig.length > 0 &&
                  this.state.asideMenuConfig.map((nav, index) => {
                    if (nav.children && nav.children.length > 0) {
                      return (
                        <SubMenu
                          key={index}
                          title={
                            <span >
                              {nav.icon ? IconUtils.buildIcon(nav.icon, 'filled') : null}
                                <span className="ice-menu-collapse-hide" 
                                    style={{marginLeft:"10px", fontSize:"14px"}}>
                                  {nav.name}
                                </span>
                            </span>
                          }
                        >
                          {nav.children.map((item) => {
                            return this.createMenu(item, false);
                          })}
                        </SubMenu>
                      );
                    }
                    return this.createMenu(nav, true);
                  })}
              </Menu>
              {/* 侧边菜单项 end */}
            </Layout.Aside>
            {/* 主体内容 */}
            <Layout.Main>{this.props.children}</Layout.Main>
          </Layout.Section>
          <Footer />
        </Layout>
        {this.createUserLoginDialog()}
      </div>
    );
  }
}
