import React from 'react';
import Link from 'next/link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { withWidth } from '@material-ui/core';
import Card from '@material-ui/core/Card';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    maxWidth: drawerWidth,
    marginRight: 0,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  drawerPaper: {
    backgroundColor: '#F9F3DE',
    width: drawerWidth,
    boxShadow: "8px 5px 8px 3px rgba(0, 0, 0, 0.1)",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: {
    width: drawerWidth,
    display: 'block',
    flexDirection: 'column',
    textDecoration: 'none',
  },
  toolbarStyle: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
    width: '100%',
    minHeight: '75px',
    height: '75px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
      minHeight: 0,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
    textDecoration: 'none',
    minWidth: 201,
    marginLeft: 20,
  },
  MuiListItemText: {
    marginTop: 100,
  },
  logoContainer: {
    width: '100%',
    margin: '2rem auto',
    textAlign: 'center',
    fontFamily: 'Whitefeather',
    fontSize: '6rem',
    [theme.breakpoints.down(768)]: {
      display: 'none',
      minHeight: 0,
    },
  },
  logoTop: {
    margin: '2rem auto 0 auto',
    textAlign: 'center',
    fontFamily: 'Whitefeather',
    fontSize: '6rem',
    [theme.breakpoints.down('sm')]: {
      color: 'white',
      fontSize: '3.5rem',
      margin: '0 auto 0 1rem',
    },
  },
  logoBottom: {
    margin: '0 auto 2rem auto',
    textAlign: 'center',
    fontFamily: 'LOVES',
    fontSize: '3rem',
    color: '#28443E',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      color: 'white',
      margin: 'auto auto auto 1rem',
      position: 'absolute',
      top: '3rem',
    },
  },
}));

function Navigation(props) {
  const { window, width } = props;

  const lgThanMd = width === 'lg' || width === 'md';

  const classes = useStyles();
  const theme = useTheme();
  const navNodes = props.menuItems.menuItems.nodes;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openVid, setOpenVid] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickVid = () => {
    setOpenVid(!openVid);
  };

  const drawer = (
    <div className={classes.root}>
      <div className={classes.logoContainer}>
        <p className={classes.logoTop}>Salty</p>
        <p className={classes.logoBottom}>Zebra</p>
      </div>
      <div className={classes.toolbar} />
      <Divider />
      <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
        {navNodes.map((node) => {
          var isSubMenItem = node.label === 'Photo' || node.label === 'Video';
          var subMListItem = node.label === 'Travel' || node.label === 'Weddings';
          if (isSubMenItem && node.label === 'Photo') {
            return (
              <ListItem button key={node.label} onClick={handleClick}>
                <ListItemText primary={node.label} />
                {open ? <ExpandLess /> : <ExpandMore />}
                <Collapse in={open} timeout="auto" entered={classes.nested} unmountOnExit>
                  <List component="div" disablePadding>
                    <Link href={'/photo-travel'}>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Travel" />
                      </ListItem>
                    </Link>
                    <Link href={'/photo-exhibitions'}>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Exhibitions" />
                      </ListItem>
                    </Link>
                    <Link href={'/photo-weddings'}>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Weddings" />
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
              </ListItem>
            );
          } else if (isSubMenItem && node.label === 'Video') {
            return (
              <ListItem button key={node.label} onClick={handleClickVid}>
                <ListItemText primary={node.label} />
                {openVid ? <ExpandLess /> : <ExpandMore />}
                <Collapse in={openVid} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link href={'/video-travel'}>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Travel" />
                      </ListItem>
                    </Link>
                    <Link href={'/video-exhibitions'}>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Exhibitions" />
                      </ListItem>
                    </Link>
                    <Link href={'/video-weddings'}>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Weddings" />
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
              </ListItem>
            );
          } else if (!isSubMenItem & !subMListItem) {
            return (
              <ListItem button key={node.label}>
                <Link href={node.path}>
                  <ListItemText primary={node.label}></ListItemText>
                </Link>
              </ListItem>
            );
          }
        })}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      {!lgThanMd && (
        <Toolbar className={classes.toolbarStyle}>
          <IconButton aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
            <MenuIcon className="hamburgerIcon" style={{ color: props.color ? 'white' : 'black' }} />
            <p>
              <span className={classes.logoTop}>Salty</span> <span className={classes.logoBottom}>Zebra</span>
            </p>
          </IconButton>
        </Toolbar>
      )}
      <nav className={classes.drawer} aria-label="navigation menu">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
export default withWidth()(Navigation);
