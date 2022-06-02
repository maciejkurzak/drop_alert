import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { useStore } from '../../store/userData';

import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Button,
} from '@mantine/core';

import { UserButton } from './UserButton';
import { LinksGroup } from './NavbarLinksGroup';

import { CalendarStats, Logout, Users } from 'tabler-icons-react';

const mockdata = [
  {
    label: 'Posts',
    icon: CalendarStats,
    color: 'blue',
    initiallyOpened: true,
    userGroups: ['user', 'admin'],
    links: [
      { label: 'Add New Post', link: '/add-post' },
      { label: 'Planned Posts', link: '/posts' },
    ],
  },
  {
    label: 'Accounts',
    icon: Users,
    color: 'teal',
    initiallyOpened: false,
    userGroups: ['admin'],
    links: [
      { label: 'Add New User', link: '/add-user' },
      { label: 'Manage Users', link: '/users' },
    ],
  },
];

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');

  return {
    navbar: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
      paddingBottom: 0,
    },

    header: {
      padding: theme.spacing.md,
      paddingTop: 0,
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },

    links: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      padding: `0 ${theme.spacing.sm}px`,
    },

    linksInner: {
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
      width: '100%',
    },

    linkIcon: {
      ref: icon,
    },

    linkButton: {},

    footer: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      padding: `0 ${theme.spacing.sm}px`,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  };
});

const SideBar = () => {
  const updateLoggedUser = useStore((store) => store.updateLoggedUser);

  const logOut = () => {
    updateLoggedUser(false);
    window.location.reload();
  };

  const { classes, cx } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const loggedUser = JSON.parse(useStore((state) => state.loggedUser)).user;

  return (
    <Navbar
      style={{ height: '100%', minHeight: '100vh' }}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section className={classes.header}>
        <h2>dropee.pl</h2>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image="https://i.imgur.com/lOlJPBo.jpg"
          name={loggedUser.username}
          email={`role: ${loggedUser.role}`}
        />

        <Button
          leftIcon={<Logout className={classes.linkIcon} />}
          className={classes.link}
          variant="default"
          size="md"
          onClick={(event: any) => {
            event.preventDefault();
            logOut();
          }}
        >
          <span>Logout</span>
        </Button>
      </Navbar.Section>
    </Navbar>
  );
};

export default SideBar;
