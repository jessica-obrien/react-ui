import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import FactoryIcon from '@mui/icons-material/Factory'
import InfoIcon from '@mui/icons-material/Info'
import { Divider, MenuList as MuiMenuList } from '@mui/material'
import { AdminMenu } from 'components/UI/NavigationBar/MenuList/AdminMenu'
import { ListItemLink } from 'components/UI/NavigationBar/MenuList/ListItemLink'
import { OptionsMenu } from 'components/UI/NavigationBar/MenuList/OptionsMenu'
import * as React from 'react'

const MenuList = () => {
  return (
    <MuiMenuList>
      {mainEntries.map((entry: mainEntriesType) => {
        return (
          <ListItemLink
            to={entry.path}
            primary={entry.displayName}
            key={entry.key}
            icon={entry.icon}
          />
        )
      })}
      <AdminMenu />
      <Divider />
      <ListItemLink to={'/about'} primary={'About'} icon={<InfoIcon />} />
      <OptionsMenu />
    </MuiMenuList>
  )
}

export { MenuList }

type mainEntriesType = {
  key: string
  path: string
  displayName: string
  icon?: React.ReactElement
}

const mainEntries: mainEntriesType[] = [
  {
    key: 'bgMenuEntry0001',
    path: '/systems',
    displayName: 'Systems',
    icon: <FactoryIcon />,
  },
  {
    key: 'bgMenuEntry0002',
    path: '/requests',
    displayName: 'Requests',
    icon: <EmojiPeopleIcon />,
  },
  {
    key: 'bgMenuEntry0003',
    path: '/jobs',
    displayName: 'Scheduler',
    icon: <AccessTimeIcon />,
  },
]