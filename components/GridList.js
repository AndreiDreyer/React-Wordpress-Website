import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

const tileData = [
    { img: "RR1.jpg", title: "1", author: "john smith", rows: 4, cols: 2},
    { img: "tortoise1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "warthog1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "RR1.jpg", title: "logo", author: "john smith" , rows: 2, cols: 1},
    { img: "tortoise1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "warthog1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "RR1.jpg", title: "logo", author: "john smith" , rows: 2, cols: 1},
    { img: "Gin1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "tortoise1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "warthog1.jpg", title: "logo", author: "mary smith" , rows: 4, cols: 2},
    { img: "RR1.jpg", title: "logo", author: "john smith" , rows: 2, cols: 1},
    { img: "Gin1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "warthog1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "RR1.jpg", title: "logo", author: "john smith" , rows: 2, cols: 1},
    { img: "tortoise1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "warthog1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "RR1.jpg", title: "logo", author: "john smith" , rows: 2, cols: 1},
    { img: "tortoise1.jpg", title: "logo", author: "mary smith" , rows: 4, cols: 1},
    { img: "warthog1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "RR1.jpg", title: "logo", author: "john smith" , rows: 2, cols: 1},
    { img: "tortoise1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "warthog1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "bowser1.jpg", title: "logo", author: "john smith" , rows: 2, cols: 1},
    { img: "Gin1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1},
    { img: "warthog1.jpg", title: "logo", author: "mary smith" , rows: 2, cols: 1}
  ];