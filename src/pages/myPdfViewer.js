import React from 'react';
import { Container, Typography, Button } from '@mui/material';




const MyPdfViewer = ({pdfUrl}) => {

  const handleViewPdf = () => {
    window.open(
      //`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`,
      `${pdfUrl}`,
      'PDF Viewer',
      'width=800,height=600'
    );
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        View PDF
      </Typography>
      <Button variant="contained" onClick={handleViewPdf}>
        View PDF
      </Button>
    </Container>
  );
};



export default MyPdfViewer;