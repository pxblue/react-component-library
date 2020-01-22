import React, { ReactNode } from 'react';
import { StyleRules, Theme, WithStyles, withStyles, WithTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { InfoListItem } from '../index';

export type NavItem = {
    active?: boolean;
    icon?: JSX.Element;
    onClick?: Function;
    statusColor?: string;
    subtitle?: string;
    title: string;
};

type DrawerNavGroupProps = {
    activeBackgroundColor?: string;
    activeFontColor?: string;
    activeIconColor?: string;
    backgroundColor?: string;
    chevron?: boolean;
    content?: ReactNode;
    fontColor?: string;
    iconColor?: string;
    items: NavItem[];
    onSelect?: Function;
    open?: boolean;
    title?: string;
    titleColor?: string;
} & WithStyles &
    WithTheme;

function NavigationListItem(item: NavItem, props: DrawerNavGroupProps): ReactNode {
    const { title, subtitle, icon, statusColor, onClick, active } = item;
    if (!title && !icon) {
        return null;
    }

    const {
        classes,
        theme,
        iconColor,
        fontColor,
        chevron,
        activeFontColor,
        activeIconColor,
        activeBackgroundColor,
        onSelect,
    } = props;

    // @ts-ignore // TODO: FIX ME
    const defaultSelectedBackgroundColor = theme.palette.secondary[50];
    const action = (): void => {
        if (onSelect) {
            onSelect();
        }
        if (onClick) {
            onClick();
        }
    };

    return (
        <div style={{ position: 'relative' }} className={`${classes.listItem} ${active && classes.listItemNoHover}`}>
            {active && (
                <div
                    className={classes.active}
                    style={{ backgroundColor: activeBackgroundColor || defaultSelectedBackgroundColor }}
                />
            )}
            <InfoListItem
                dense
                title={title}
                subtitle={subtitle}
                divider={'full'}
                statusColor={statusColor}
                fontColor={active ? activeFontColor : fontColor}
                icon={icon}
                iconColor={active ? activeIconColor : iconColor}
                chevron={chevron}
                backgroundColor={'transparent'}
                onClick={(): void => action()}
            />
        </div>
    );
}

const DrawerNavGroupContent: React.FC<DrawerNavGroupProps> = (props) => {
    const { classes, open, items, title, content, backgroundColor, titleColor } = props;
    return (
        <>
            <List
                style={{ paddingBottom: '0', backgroundColor }}
                subheader={
                    <ListSubheader
                        className={classes.subheader}
                        style={{
                            position: 'unset',
                            color: open ? titleColor : 'transparent',
                        }}
                    >
                        {title && (
                            <Typography noWrap variant={'subtitle2'} className={classes.navGroupTextHeader}>
                                {title}
                            </Typography>
                        )}
                        {content}
                    </ListSubheader>
                }
            >
                <div key={`${title}_title`}>{(title || content) && <Divider />}</div>
                {items.map((item: NavItem, index: number) => (
                    <div key={`${title}_item_${index}`}>{NavigationListItem(item, props)}</div>
                ))}
            </List>
            <Divider />
        </>
    );
};

const styles = (theme: Theme): StyleRules => ({
    navGroupTextHeader: {
        width: '95%',
        display: 'block',
        alignItems: 'center',
        lineHeight: '3rem',
        height: theme.spacing(6),
    },
    subheader: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        cursor: 'text',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
    },
    listItem: {
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
    },
    listItemNoHover: {
        '&:hover': {
            backgroundColor: 'unset',
        },
    },
    active: {
        content: '""',
        zIndex: 0,
        position: 'absolute',
        height: '100%',
        width: 'calc(100% - 8px)',
        left: 0,
        top: 0,
        // TODO: Add Palette Type
        //@ts-ignore
        backgroundColor: theme.palette.primary['50'],
        borderRadius: '0px 24px 24px 0px',
        opacity: 0.9,
    },
});

export const DrawerNavGroup = withStyles(styles, { withTheme: true })(DrawerNavGroupContent);
DrawerNavGroup.displayName = 'DrawerNavGroup';