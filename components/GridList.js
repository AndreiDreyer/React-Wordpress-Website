/* eslint-disable @typescript-eslint/no-use-before-define */
// import * as React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import ImageList from '@material-ui/core/ImageList';
// import ImageListItem from '@material-ui/core/ImageListItem';
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
    backgroundColor: theme.palette.background.paper,
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

// const useStyles = makeStyles({
//   root: {
//     width: 1500,
//     height: 980,
//     margin: 'auto',
//     flex: 1
//   },
//   marginAutoItem: {
//     margin: 'auto'
//   },
// });

// function srcset(image, size, rows = 1, cols = 1) {
//   return `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format 1x,
//   ${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`;
// }

// export default function QuiltedImageList() {
//   const classes = useStyles();

//   return (
//     <ImageList variant="quilted" cols={4} rowHeight={121} className={classes.root} gap={15}>
//       {itemData.map((item) => (
//         <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
//           <img
//             srcSet={srcset(item.img, 121, item.rows, item.cols)}
//             alt={item.title}
//           />
//         </ImageListItem>
//       ))}
//     </ImageList>
//   );
// }

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