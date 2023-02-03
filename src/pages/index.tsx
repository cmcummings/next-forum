import { Toolbar, Box, Avatar, List, ListItem, ListItemText, ListItemButton, ListItemAvatar, Typography, Divider, Stack, AppBar, ButtonGroup, Button, IconButton, Icon, TextField, FormControl, Input, InputAdornment } from '@mui/material'
import Head from 'next/head';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Head>
        <title>ware-chat</title>
      </Head>
      <main>
        <Box display="flex" flexDirection="column" height="100vh">
          <Box bgcolor="#202020" padding="8px" height="60px">
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Box>
                <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <ChatIcon />
                </IconButton>
              </Box>
              <Box>
                <FormControl variant="standard">
                  <Input startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}/>
                </FormControl>
              </Box>
              <Box>
                <Stack direction="row" spacing={2}>
                  <Stack direction="column" alignItems="flex-end">
                    <Typography>Main User</Typography>
                    <Typography sx={{ color: '#ffffffb3' }}>MainUser#134</Typography>
                  </Stack>
                  <Avatar />
                </Stack>
              </Box>
            </Box>
          </Box>
          <Box height="calc(100% - 60px)" flexGrow={1} display="flex" flexDirection="row">
            {sidebarOpen ? 
            <Box width="250px" bgcolor="#181818" overflow="auto">
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
            : <></>}

            <Box sx={{ flexGrow: 1 }} overflow="auto">
              <Box>
                A chat message could go here
              </Box>
            </Box>
          </Box>
        </Box>
      </main>
    </>
  )
}
