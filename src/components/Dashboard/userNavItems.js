import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Ballot from '@material-ui/icons/Ballot';

import Search from '@material-ui/icons/Search';

import * as routes from '../Routes/routes';

const link = { textDecoration: 'none', color: 'initial' };

export const userNavItems = (
  <div>
    <Link to={routes.HOME} style={link}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to={routes.CATEGORYLIST} style={link}>
      <ListItem button>
        <ListItemIcon>
          <Ballot />
        </ListItemIcon>
        <ListItemText primary="View Categories" />
      </ListItem>
    </Link>
    <Link to={routes.SEARCH} style={link}>
      <ListItem button>
        <ListItemIcon>
          <Search />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItem>
    </Link>
  </div>
);

