/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

const useStyles = makeStyles({
  root: {
    width: 1500,
    height: 1500,
    margin: 'auto',
    flex: 1
  },
  marginAutoItem: {
    margin: 'auto'
  },
});

function srcset(image, size, rows = 1, cols = 1) {
  return `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format 1x,
  ${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`;
}

export default function QuiltedImageList() {
  const classes = useStyles();

  return (
    <ImageList variant="quilted" cols={4} rowHeight={121} className={classes.root}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            srcSet={srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
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