import { AppBar, Hidden, Toolbar, Typography, IconButton, Tooltip, makeStyles, createStyles } from '@material-ui/core';
import { Email, Menu, Settings, InvertColors, SwapHoriz } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { store } from '../store';

import { Spacer, UserMenu } from '@pxblue/react-components';

const useStyles = makeStyles((theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(4),
        },
    })
);

export const SharedAppBar = (props) => {
    const { onClick } = props;
    const theme = useTheme();
    const classes = useStyles();

    return (
        <AppBar position={'sticky'} color={'primary'}>
            <Toolbar style={{ padding: `0 ${theme.spacing(2)}px` }}>
                <Hidden smUp>
                    <Menu className={classes.menuButton} onClick={onClick} />
                </Hidden>
                <Typography variant={'h6'}>Showcase</Typography>
                <Spacer flex={1} />
                <Tooltip title={'Toggle Theme'} aria-label={'toggle the theme of the current showcase'}>
                    <IconButton
                        color={'inherit'}
                        onClick={() => {
                            store.dispatch({ type: 'ToggleTheme' });
                        }}
                    >
                        <InvertColors />
                    </IconButton>
                </Tooltip>
                <Spacer width={theme.spacing(1)} flex={0} />
                <Tooltip title={'Toggle Direction'} aria-label={'toggle the app direction: ltr/rtl'}>
                    <IconButton
                        color={'inherit'}
                        onClick={() => {
                            store.dispatch({ type: 'ToggleDirection' });
                        }}
                    >
                        <SwapHoriz />
                    </IconButton>
                </Tooltip>
                <Spacer width={theme.spacing(1)} flex={0} />
                <UserMenu
                    avatar={<Avatar>MS</Avatar>}
                    menuTitle={'Marshall Sutter'}
                    menuSubtitle={'msutter@acmesteel.com'}
                    menuGroups={[
                        {
                            items: [
                                {
                                    title: 'Log Out',
                                    icon: <SendIcon />,
                                    onClick: () => {},
                                },
                                {
                                    title: 'Account Settings',
                                    icon: <Settings />,
                                    divider: true,
                                    onClick: () => {},
                                },
                            ],
                        },
                        {
                            title: 'Contact Us',
                            items: [
                                {
                                    title: 'eatonhelp@eaton.com',
                                    icon: <SendIcon />,
                                    onClick: () => {},
                                },
                                {
                                    title: '1-866-905-9988',
                                    icon: <Email />,
                                    onClick: () => {},
                                },
                            ],
                        },
                    ]}
                />
            </Toolbar>
        </AppBar>
    );
};
