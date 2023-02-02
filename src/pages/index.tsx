import { Box, Avatar, List, ListItem, ListItemText, ListItemButton, ListItemAvatar, Grid, Typography, Divider, Paper } from '@mui/material'
import { Stack } from '@mui/system'
import Head from 'next/head'


export default function Home() {
  return (
    <>
      <Head>
        <title>ware-chat</title>
        <meta name="description" content="warechat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box minWidth="50px" maxWidth="250px" bgcolor="#181818" height="100vh">
          <Stack height="100%" direction="column" justifyContent="space-between">
            <Box sx={{ overflow: 'scroll' }}>
              <List>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i =>
                  <ListItem disableGutters>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText primary={`User ${i}`} secondary={`User ${i} sent a message.`} />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Box>
            <Box>
              <Divider />
              <Paper square>
                <ListItem disableGutters>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary="Main User" secondary="Online" />
                  </ListItemButton>
                </ListItem>
              </Paper>
            </Box>
          </Stack>
        </Box>
      </main>
    </>
  )
}
