import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Appointment Scheduled</Title>
      <Typography component="p" variant="h4">
        1
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 08 November, 2023
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View details
        </Link>
      </div>
    </React.Fragment>
  );
}