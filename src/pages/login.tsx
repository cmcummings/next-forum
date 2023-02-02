import { Paper, TextField, Typography, Stack, Divider, Button, Box, Tabs, Tab } from "@mui/material";import { useState } from "react";


export default function Login() {
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper variant="outlined">
        <Tabs variant="fullWidth" value={tabIdx} onChange={(e, v) => setTabIdx(v)}>
          <Tab label="Login" />
          <Tab label="Sign up" />
        </Tabs>
        <Box padding="20px" minWidth="400px">
          {tabIdx == 0 ? 
            <Stack spacing={2}>
              <Typography>Login with ware-chat account:</Typography>
              <Divider />
              <TextField label="Username" variant="outlined"></TextField>
              <TextField label="Password" variant="outlined" type="password"></TextField>
              <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained">Login</Button>
              </Stack>
            </Stack>
          : 
            <Stack spacing={2}>
              <Typography>Sign up for a ware-chat account:</Typography>
              <Divider />
              <TextField label="Username" variant="outlined"></TextField>
              <TextField label="Password" variant="outlined" type="password"></TextField>
              <TextField label="Confirm password" variant="outlined" type="password"></TextField>
              <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained">Sign up</Button>
              </Stack>
            </Stack>
          }
        </Box>
      </Paper>
    </Box>
  )
}