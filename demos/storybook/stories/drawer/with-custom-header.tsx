import { Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer, DrawerBody, DrawerHeader, DrawerNavGroup } from '@pxblue/react-components/core/Drawer';
import { boolean } from '@storybook/addon-knobs';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React from 'react';
import { DrawerStoryContext } from './util';
import { navGroupItems1 } from './with-basic-config';
import { ListItemTag } from '@pxblue/react-components';

const farmBgImage = require('../../assets/farm.jpg');

export const withCustomHeader = (context: DrawerStoryContext): StoryFnReactReturnType => (
    <Drawer open={boolean('open', true)} activeItem={context.state.selected}>
        <DrawerHeader
            backgroundImage={farmBgImage}
            backgroundOpacity={0.5}
            icon={<MenuIcon />}
            titleContent={
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        zIndex: 1,
                        padding: '0 16px',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div>
                        <Typography variant="subtitle2">Customizable</Typography>
                        <Typography variant="h6" style={{ marginTop: '-10px' }}>
                            Header Content
                        </Typography>
                    </div>
                    <ListItemTag style={{ marginBottom: 16 }} label={'v1.0.3'} />
                </div>
            }
        />
        <DrawerBody>
            <DrawerNavGroup items={navGroupItems1} />
        </DrawerBody>
    </Drawer>
);

withCustomHeader.story = { name: 'with custom header' };
