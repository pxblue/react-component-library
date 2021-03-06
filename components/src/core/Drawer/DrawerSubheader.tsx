import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { useDrawerContext } from './DrawerContext';
import { Divider } from '@material-ui/core';

export type DrawerSubheaderProps = HTMLAttributes<HTMLDivElement> & {
    divider?: boolean;
    hideContentOnCollapse?: boolean;
};

const DrawerSubheaderRender: React.ForwardRefRenderFunction<unknown, DrawerSubheaderProps> = (
    props: DrawerSubheaderProps,
    ref: any
) => {
    const { children, divider = true, hideContentOnCollapse = true, ...otherDivProps } = props;
    const { open: drawerOpen = true } = useDrawerContext();
    return (
        <>
            <div
                ref={ref}
                style={{ visibility: drawerOpen || !hideContentOnCollapse ? 'inherit' : 'hidden' }}
                {...otherDivProps}
            >
                {children}
            </div>
            {divider && <Divider />}
        </>
    );
};
export const DrawerSubheader = React.forwardRef(DrawerSubheaderRender);

DrawerSubheader.displayName = 'DrawerSubheader';
DrawerSubheader.propTypes = {
    divider: PropTypes.bool,
    hideContentOnCollapse: PropTypes.bool,
};
