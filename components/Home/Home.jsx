import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import Link from 'next/link';


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOutUser } from '../../store'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.


/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
// function GenericIsUserLoggedInLink({ isLoggedIn, route, anchorText }) {
//  return isLoggedIn ? <Menu.Item><Link href={route}><a>{anchorText}</a></Link></Menu.Item> : null;
// }

// function GenericIsUserLoggedInLink({ isLoggedIn, logOutUser, route, anchorText }) {
//  return isLoggedIn ? <Link href="/"><a onClick={() => logOutUser()}>Log out!</a></Link> : <Link href={route}><a>{anchorText}</a></Link>;
// }
function GenericIsUserLoggedInLink({ isLoggedIn, logOutUser, route, anchorText }) {
 if (isLoggedIn) {
  if (anchorText === undefined) {
   return <Link href="/"><a onClick={() => logOutUser()}>Log out!</a></Link>
  } else if (anchorText) {
   return <Link href={route}><a>{anchorText}</a></Link>
  } else {
   return null
  }
 } else {
  return  <Link href="/login"><a>Log in!</a></Link>
 }
}

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='An app on the decline...uh about one!'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Do whatever you want when you want to.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

 logOutUser = () => {
  const { logOutUser } = this.props
  logOutUser()
 }

  render() {
   const { children, getWidth, isLoggedIn, logOutUser } = this.props
    console.log("isLoggedIn ", isLoggedIn);
    console.log("logOutUser ", logOutUser);
    console.log("this.props ", this.props);


    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
               <Menu.Item active>
                 <Link href="/">
                  <a>Home</a>
                </Link>
              </Menu.Item>

          <Menu.Item>
           <GenericIsUserLoggedInLink
            isLoggedIn={isLoggedIn}
            route="/profile"
            anchorText="Profile"
           />
          </Menu.Item>


              <Menu.Item>
               <GenericIsUserLoggedInLink
                isLoggedIn={isLoggedIn}
                route="/dashboard"
                anchorText="Dashboard"
               />
              </Menu.Item>
                <Menu.Item position='right'>
                 <Button inverted={!fixed}>
                  <GenericIsUserLoggedInLink isLoggedIn={isLoggedIn} logOutUser={logOutUser}/>
                 </Button>
                 <Button inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                  <Link href="/register">
                   <a>Register</a>
                  </Link>
                </Button>
               </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

 logOutUser = () => {
  const { logOutUser } = this.props
  logOutUser()
 }

  render() {
   const { children, getWidth, isLoggedIn, logOutUser } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
       <Menu.Item active>
           <Link href="/">
           <a>Home</a>
          </Link>
       </Menu.Item>
        <Menu.Item>
         <GenericIsUserLoggedInLink isLoggedIn={isLoggedIn} route="/profile" anchorText="Profile" />
        </Menu.Item>
        <Menu.Item>
         <GenericIsUserLoggedInLink isLoggedIn={isLoggedIn} route="/dashboard" anchorText="Dashboard" />
        </Menu.Item>
        <Menu.Item>
        <GenericIsUserLoggedInLink isLoggedIn={isLoggedIn} logOutUser={logOutUser} />

        </Menu.Item>

          <Menu.Item >
           <Link href="/register">
            <a>Register</a>
           </Link>
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children, getWidth, isLoggedIn, logOutUser }) => (
  <React.Fragment>
   <DesktopContainer isLoggedIn={isLoggedIn} logOutUser={logOutUser}>{children}</DesktopContainer>
   <MobileContainer getWidth={getWidth} isLoggedIn={isLoggedIn} logOutUser={logOutUser}>{children}</MobileContainer>
  </React.Fragment>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const getWidthFactory = isMobileFromSSR => () => {
  const isSSR = typeof window === "undefined";
  const ssrValue = isMobileFromSSR
    ? Responsive.onlyMobile.maxWidth
    : Responsive.onlyTablet.minWidth;

  return isSSR ? ssrValue : window.innerWidth;
};

const HomepageLayout = ({ getWidth, isMobileFromSSR, isLoggedIn, logOutUser}) => (
 <ResponsiveContainer isLoggedIn={isLoggedIn} logOutUser={logOutUser} getWidth={getWidthFactory(isMobileFromSSR)}>
 <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Help Companies and Companions
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We can give your company superpowers to do things that they never thought possible.
              Let us delight your customers and empower your needs... through pure data analytics.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Make Bananas That Can Dance
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes that's right, you thought it was the stuff of dreams, but even bananas can be
              bioengineered.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            {/* <Image bordered rounded size='large' src='/images/wireframe/white-image.png' /> */}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>Check Them Out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "What a Company"
            </Header>
            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "I shouldn't have gone with their competitor."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              {/* <Image avatar src='/images/avatar/large/nan.jpg' /> */}
              <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
        </p>
        <Button as='a' size='large'>
          Read More
        </Button>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
          Did We Tell You About Our Bananas?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
          it's really true. It took years of gene splicing and combinatory DNA research, but our
          bananas can really dance.
        </p>
        <Button as='a' size='large'>
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

function mapStateToProps(state) {
 const { isLoggedIn } = state
 return { isLoggedIn }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({ logOutUser }, dispatch)


export default connect(
 mapStateToProps,
 mapDispatchToProps
)(HomepageLayout)
