import React from 'react';
import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
} from '@mantine/core';
import { ChevronRight } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.md}px ${theme.spacing.sm}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    cursor: 'default',

    // '&:hover': {
    //   backgroundColor:
    //     theme.colorScheme === 'dark'
    //       ? theme.colors.dark[8]
    //       : theme.colors.gray[0],
    // },
  },
}));

interface UserButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function UserButton({
  image,
  name,
  email,
  icon,
  ...others
}: UserButtonProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={image} radius="md" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {/* {icon || <ChevronRight size={14} />} */}
      </Group>
    </UnstyledButton>
  );
}
