import React, { ReactNode, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    createStyles,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
    ToolbarProps,
    Divider,
    IconButton,
} from '@material-ui/core';
import { useDrawerContext } from './DrawerContext';
import clsx from 'clsx';

type DrawerHeaderClasses = {
    root?: string;
    background?: string;
    content?: string;
    navigation?: string;
    nonClickableIcon?: string;
    railIcon?: string;
    subtitle?: string;
    title?: string;
};

export type DrawerHeaderProps = ToolbarProps & {
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundOpacity?: number;
    classes?: DrawerHeaderClasses;
    divider?: boolean;
    fontColor?: string;
    icon?: ReactNode;
    onIconClick?: () => void;
    subtitle?: string;
    title?: string;
    titleContent?: ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingRight: 0,
            paddingLeft: 0,
            width: '100%',
            alignItems: 'flex-start',
            boxSizing: 'border-box',
            backgroundColor: (props: DrawerHeaderProps): string =>
                props.backgroundColor ||
                (theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main),
            color: (props: DrawerHeaderProps): string =>
                props.fontColor ||
                theme.palette.getContrastText(
                    props.backgroundColor ||
                        (theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main)
                ),
        },
        background: {
            position: 'absolute',
            zIndex: 0,
            width: '100%',
            backgroundSize: 'cover',
            height: '100%',
            backgroundPosition: 'center',
            backgroundImage: (props: DrawerHeaderProps): string => `url(${props.backgroundImage})`,
            opacity: (props: DrawerHeaderProps): number => props.backgroundOpacity,
        },
        content: {
            [theme.breakpoints.down('xs')]: {
                minHeight: theme.spacing(7),
            },
            marginLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            minHeight: theme.spacing(8),
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'stretch',
            flexDirection: 'column',
            width: 'calc(100% - 56px)',
            boxSizing: 'border-box',
            zIndex: 1,
        },
        navigation: {
            [theme.breakpoints.down('xs')]: {
                height: theme.spacing(7),
            },
            padding: theme.spacing(0.5),
            height: theme.spacing(8),
            display: 'flex',
            alignItems: 'center',
            zIndex: 1,
        },
        nonClickableIcon: {
            display: 'flex',
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5),
        },
        railIcon: {
            marginLeft: theme.spacing(1),
        },
        subtitle: {
            lineHeight: '1.2rem', // Anything lower than 1.2rem cuts off bottom text of 'g' or 'y'.
            marginTop: '-2px',
        },
        title: {
            fontWeight: 600,
            lineHeight: '1.6rem', // Anything lower than 1.6rem cuts off bottom text of 'g' or 'y'.
        },
    })
);

const DrawerHeaderRender: React.ForwardRefRenderFunction<unknown, DrawerHeaderProps> = (
    props: DrawerHeaderProps,
    ref: any
) => {
    const defaultClasses = useStyles(props);
    const {
        backgroundImage,
        classes,
        divider,
        icon,
        onIconClick,
        subtitle,
        title,
        titleContent,
        // ignore unused vars so that we can do prop transferring to the root element
        /* eslint-disable @typescript-eslint/no-unused-vars */
        backgroundColor,
        backgroundOpacity,
        fontColor,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...otherToolbarProps
    } = props;

    const { variant = 'persistent', condensed = false } = useDrawerContext();

    const getHeaderContent = useCallback(
        (): ReactNode =>
            titleContent || (
                <div className={clsx(defaultClasses.content, classes.content)}>
                    <Typography
                        noWrap
                        variant={'h6'}
                        className={clsx(defaultClasses.title, classes.title)}
                        data-test={'drawer-header-title'}
                    >
                        {title}
                    </Typography>

                    {subtitle && (
                        <Typography
                            noWrap
                            variant={'body2'}
                            className={clsx(defaultClasses.subtitle, classes.subtitle)}
                            data-test={'drawer-header-subtitle'}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </div>
            ),
        [defaultClasses, classes, title, subtitle, titleContent]
    );

    const getBackgroundImage = useCallback(
        (): JSX.Element | null =>
            backgroundImage ? <div className={clsx(defaultClasses.background, classes.background)} /> : null,
        [backgroundImage, defaultClasses, classes]
    );

    return (
        <>
            <Toolbar ref={ref} className={clsx(defaultClasses.root, classes.root)} {...otherToolbarProps}>
                {getBackgroundImage()}
                {icon && (
                    <div
                        className={clsx(defaultClasses.navigation, classes.navigation, {
                            [defaultClasses.railIcon]: variant === 'rail' && !condensed,
                            [classes.railIcon]: variant === 'rail' && !condensed && classes.railIcon,
                        })}
                    >
                        {onIconClick && (
                            <IconButton
                                color={'inherit'}
                                onClick={(): void => {
                                    onIconClick();
                                }}
                            >
                                {icon}
                            </IconButton>
                        )}
                        {!onIconClick && (
                            <div className={clsx(defaultClasses.nonClickableIcon, classes.nonClickableIcon)}>
                                {icon}
                            </div>
                        )}
                    </div>
                )}
                {getHeaderContent()}
            </Toolbar>
            {divider && <Divider />}
        </>
    );
};
export const DrawerHeader = React.forwardRef(DrawerHeaderRender);

DrawerHeader.displayName = 'DrawerHeader';
DrawerHeader.defaultProps = {
    backgroundOpacity: 0.3,
    classes: {},
    divider: false,
};
DrawerHeader.propTypes = {
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundOpacity: PropTypes.number,
    classes: PropTypes.shape({
        root: PropTypes.string,
        background: PropTypes.string,
        content: PropTypes.string,
        navigation: PropTypes.string,
        nonClickableIcon: PropTypes.string,
        railIcon: PropTypes.string,
        subtitle: PropTypes.string,
        title: PropTypes.string,
    }),
    divider: PropTypes.bool,
    fontColor: PropTypes.string,
    icon: PropTypes.element,
    onIconClick: PropTypes.func,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    titleContent: PropTypes.element,
};
