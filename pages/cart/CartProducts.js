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
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'white',
    [theme.breakpoints.up(768)]: {
      display: 'flex',
    },
  },
  tableContainer: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 0,
  },
  checkoutBtn: {
    backgroundColor: '#252525 !important',
    color: 'white',

    [theme.breakpoints.down(765)]: {
      display: 'block',
      position: 'relative',
      width: '275px',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '1rem',
    },
  },
  clearCartBtn: {
    color: 'red',
    [theme.breakpoints.down(765)]: {
      display: 'block',
      position: 'relative',
      width: '275px',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '1rem',
    },
  },
  productImage: {
    height: '75px',
    width: '100px',
  },
  tableCell: {
    padding: '0 0 0 0.5rem',
  },
  productName: {
    fontSize: '1.2rem',
  },
  productPrice: {
    fontSize: '16px',
  },
  finalRow: {
    border: 'none',
  },
  buttonContainer: {
    position: '-webkit-sticky',
    position: 'sticky',
    bottom: 0,
    marginTop: '0.5rem',
    borderTop: '1px solid rgba(224, 224, 224, 1)',
    boxShadow: '0px -7px 10px -8px rgba(128,128,128, 0.5)',
    marginBottom: 75,
    backgroundColor: 'white',
    minHeight: '175px',
  },
  cartTotalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '2rem',
    marginRight: '2rem',
    fontWeight: 'bold',
    fontSize: '16px',
  },
}));

export default function CartProducts() {
  const { total, cartItems, removeProduct, clearCart } = useContext(CartContext);

  const classes = useStyles();
  const theme = useTheme();

  const smThanIpad = useMediaQuery(theme.breakpoints.down(765));

  return (
    <div className={classes.root}>
      {!smThanIpad && (
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
      )}

      {smThanIpad && (
        <React.Fragment>
          <TableContainer>
            <Table className={classes.tableContainer}>
              <TableBody>
                {cartItems.map((product) => (
                  <React.Fragment>
                    <TableRow key={product.id}>
                      <TableCell className={classes.productImage} rowSpan={3}>
                        <img src={product.image.src} className={classes.productImage} />
                      </TableCell>
                      <TableCell>
                        <TableRow>
                          <TableCell colSpan={2} padding="none" className={classes.productName}>
                            {product.name}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell padding="none">Size:</TableCell>
                          <TableCell className={classes.tableCell}>{product.attributes[0].option}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell padding="none">Qty x Price:</TableCell>
                          <TableCell className={classes.tableCell}>
                            {product.quantity} x ${product.price}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell padding="none">Total:</TableCell>
                          <TableCell className={classes.tableCell}>${product.price * product.quantity}</TableCell>
                        </TableRow>
                      </TableCell>
                    </TableRow>
                    <TableRow></TableRow>
                    <TableRow></TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.buttonContainer}>
            <div className={classes.cartTotalContainer}>
              <p>Cart Total:</p>
              <p>${total}</p>
            </div>
            <Link href="/checkout">
              <Button className={classes.checkoutBtn}>Checkout</Button>
            </Link>
            <Button variant="outlined" color="secondary" className={classes.clearCartBtn} onClick={() => clearCart()}>
              Clear
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
