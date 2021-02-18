import React, { useContext } from 'react';

import Link from 'next/link';

import { CartContext } from '../../src/contexts/CartContext';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  tableContainer: {
    width: '100%',
  },
  checkoutBtn: {
    backgroundColor: '#252525 !important',
    color: 'white',
  },
  clearCartBtn: {
    color: 'red',
  },
  productImage: {
    height: '75px',
    width: '100px',
  },
}));

export default function CartProducts() {
  const { total, cartItems, removeProduct, clearCart } = useContext(CartContext);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.tableContainer}>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell colSpan={1}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((product) => (
              <TableRow key={product.id}>
                <TableCell className={classes.productImage}>
                  <img src={product.image.src} className={classes.productImage} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.attributes[0].option}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${product.price * product.quantity}</TableCell>
                <TableCell size="small">
                  <div onClick={() => removeProduct(product)}>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={2}></TableCell>
              <TableCell rowSpan={2}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}></TableCell>
              <TableCell>Total:</TableCell>
              <TableCell>${total}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell>
                <Button variant="outlined" color="secondary" className={classes.clearCartBtn} onClick={() => clearCart()}>
                  Clear
                </Button>
              </TableCell>
              <TableCell>
                <Link href="/checkout">
                  <Button className={classes.checkoutBtn}>Checkout</Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
