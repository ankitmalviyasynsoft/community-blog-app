import { Autocomplete, IconButton, Button, InputAdornment, Stack, TextField, Container, Box, SwipeableDrawer, ListItemButton, ListItemIcon, ListItemText, Divider, List, ListItem, Avatar, useMediaQuery } from '@mui/material'
import { MdMenu, MdOutlineSearch } from "react-icons/md";
import { useRouter } from 'next/router';
import { style } from './Header.style';
import React, { useState } from 'react'
import config from "@/config/config.json"
import { MdNoteAdd } from "react-icons/md";
import { theme } from '@/utils';
import ProfileMenu from './components/profileMenu/ProfileMenu.componenet';



export default function Header() {
  const router = useRouter()

  const [openDrawer, setOpenDrawer] = useState(false)
  const isSmallScreenUp = useMediaQuery(theme.breakpoints.up('sm'))

  const toggleDrawer = () => { setOpenDrawer(!openDrawer) }


  return (
    <Container>
      <Stack direction='row' justifyContent='space-between' alignItems='center' py={2} height={80} gap={1}>
        <Stack flex={1} >
          <Box height={40} width={140} onClick={() => router.push('/')} className='cursor-pointer'>
            <img src={config.logo} />
          </Box>
        </Stack>

        <Stack flex={{xs:1, md:2}} display={{xs:'none', sm:'block'}}>
          <Autocomplete sx={style.autoCompleteSearch} disableClearable options={[]} loading={false} disabled={false}
            renderInput={(params) => <TextField  {...params} variant='outlined' placeholder='Search blog eg. category, tag and blog title'
              InputProps={{ endAdornment: (<InputAdornment position="start"><IconButton><MdOutlineSearch /></IconButton></InputAdornment>) }}
            />}
            // getOptionLabel={(option) => option?.name}
            // isOptionEqualToValue={(option, value) => option.name === value.name}
            onChange={(_, data) => {
              // field.onChange(data)
              // setValue('categoryId', data._id)
              // trigger('categoryId')
            }}
          />
        </Stack>

        <Stack flex={{xs:0.5, md:1}} direction='row' justifyContent='end' alignItems='center' gap={2}>
          {
            true ? isSmallScreenUp && <ProfileMenu /> :
              <>
                <Button variant='text' onClick={() => router.push('/auth/login')}>Login</Button>
                <Button variant='contained' onClick={() => router.push('/auth/register')}> Sign Up</Button>
              </>
          }
          

          {!isSmallScreenUp && <>
            <IconButton onClick={() => toggleDrawer()} aria-label="fingerprint" color="secondary">
              <Stack justifyContent='center' alignItems='center' fontSize={32}><MdMenu /></Stack>
            </IconButton>

            <SwipeableDrawer anchor={'right'} open={openDrawer} onClose={toggleDrawer} onOpen={toggleDrawer}>
              <Box role="presentation" onClick={() => toggleDrawer()} onKeyDown={() => toggleDrawer()}>
                <List>
                  {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <MdNoteAdd />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </SwipeableDrawer>
          </>
          }
        </Stack>


      </Stack>
    </Container>
  )
}
