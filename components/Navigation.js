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

// TO be removed
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import StarBorder from '@material-ui/icons/StarBorder';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    justifyContent: 'flex-end',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: {
    width: 250,
  },
  ListItem: {
    display: 'flex',
    flexDirection: 'row',
    textDecoration: "none",
  },
}));

export default function Navigation(props) {
  const { window } = props;

  const classes = useStyles();
  const theme = useTheme();
  const navNodes = props.menuItems.menuItems.nodes;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const drawer = (
    <div>
      <p>Logo will go here</p>
      <div className={classes.toolbar} />
      <Divider />
      <List 
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
      className={classes.root}
    >
        {navNodes.map((node) => {
          console.log(node.label)
          var isSubMenItem = (node.label === 'Gallery')
          var subMListItem = (node.label === 'Travel' | node.label === 'Videography')
          if (isSubMenItem) {
            return (
              <ListItem button onClick={handleClick}>
                <ListItemText primary={node.label}/>
                {open ? <ExpandLess /> : <ExpandMore />}
                <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <Link href={'/travel'}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Travel" />
                  </ListItem>
                </Link>
                <Link href={'/videography'}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Videography" />
                  </ListItem>
                </Link>
                </List>
              </Collapse>
              </ListItem>
            );} else if(!isSubMenItem & !subMListItem) {
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

  console.log(theme.breakpoints);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <CssBaseline />
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </Toolbar>
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
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
