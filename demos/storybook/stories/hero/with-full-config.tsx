import * as Colors from '@pxblue/colors';
import {Hero} from '@pxblue/react-components';
import {action} from "@storybook/addon-actions";
import {boolean, color, number, text, select} from '@storybook/addon-knobs';
import {StoryFnReactReturnType} from '@storybook/react/dist/client/preview/types';
import React from 'react';
import { Fan } from '@pxblue/icons-mui';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

export const withFullConfig = (): StoryFnReactReturnType => (
   <Hero
      label={text('label', 'Velocity')}
      units={text('units','RPM')}
      onClick={action('clicked')}
      value={text('value', '470')}
      valueIcon={boolean('Show Value Icon', true) ? <TrendingUpIcon /> : undefined}
      iconBackgroundColor={color('iconBackgroundColor', Colors.blue[500])}
      icon={<Fan fontSize={'inherit'} htmlColor={color('icon.htmlColor', Colors.white[50])}/>}
      iconSize={number('iconSize', 35)}
      fontSize={select('fontSize', ['normal', 'small'], 'small')}
   />
);

withFullConfig.story = { name: 'with full config' };
