import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Container, Grid, TextField, Typography, IconButton, Button } from '@mui/material';
import { ArrowForward, Cancel } from '@material-ui/icons';
import { fetchPurchasedCourse } from '../redux/actions/cart.action';
import { useSelector, useDispatch } from 'react-redux';

const PurchasedCourse = () => {
  const { user } = useSelector((state) => state.auth);
  const { purchasedCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const modifiedPurchasedCourses = purchasedCourses.reduce((acc, cur) => acc.concat(cur.courses), []);

  useEffect(() => {
    dispatch(fetchPurchasedCourse(user?.uid ?? user?.id));
  }, []);

  return (
    <Container
      maxWidth="xs"
      sx={{ backgroundColor: 'white', border: '1px solid lightgray', fontSize: '0.85rem', minHeight: '500px' }}
    >
      <Grid
        item
        xs={12}
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: '1rem' }}
      >
        <center>
          <p
            style={{
              position: 'relative',
              display: 'block',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              borderBottom: '3px solid red',
              width: '150px',
              marginTop: '20px',
            }}
          >
            Purchased Courses
          </p>
        </center>
      </Grid>

      <Grid container xs={12} style={{ paddingTop: '1.5rem' }}>
        {modifiedPurchasedCourses?.map((item, index) => (
          <Grid item xs={12} key={index} style={{ paddingTop: '0.5rem', marginBottom: '10px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '3px solid black',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {item.title}
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton>
                  <ArrowForward />
                </IconButton>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      <br />
      <br />
      <br />
    </Container>
  );
};
export default PurchasedCourse;
