import React from 'react';

import Link from 'next/link';

import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    height: 75,
    backgroundColor: '#f9f3de',
    [theme.breakpoints.up(768)]: {
      display: 'none',
    },
  },
  mediaIcon: {
    color: 'black',
    width: '24px',
    height: '24px',
    marginRight: '1rem',
    marginLeft: '1rem',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* TODO: Link Buttons to Social Media */}
      <Link href="">
        <IconButton>
          <FacebookIcon className={classes.mediaIcon} />
        </IconButton>
      </Link>
      <Link href="">
        <IconButton>
          <InstagramIcon className={classes.mediaIcon} />
        </IconButton>
      </Link>
    </div>
  );
}
