import { Paper, TextField, Typography, Stack, Divider, Button, Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import Head from "next/head";
import { signIn } from "next-auth/react";

export default function Login() {
  const [tabIdx, setTabIdx] = useState(0);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  function login() {
    if (loginUsername && loginPassword) {
      signIn('credentials', { 
        username: loginUsername, 
        password: loginPassword,
        callbackUrl: 'http://localhost:3000'
      }).then(res => {
          if (!res) return
          if (res.ok) {
            console.log("Logged in!")
          }
        })
    }
  }

  return (
    <>
      <Head>
        <title>ware-chat/login</title>
      </Head>
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
                <TextField label="Username" variant="outlined" value={loginUsername} onChange={e => setLoginUsername(e.target.value)}></TextField>
                <TextField label="Password" variant="outlined" type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)}></TextField>
                <Stack direction="row" justifyContent="flex-end">
                  <Button variant="contained" onClick={login}>Login</Button>
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
    </>
  )
}