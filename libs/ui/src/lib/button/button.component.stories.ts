import { text } from '@storybook/addon-knobs';
import { ButtonComponent } from './button.component';

export default {
  title: 'ButtonComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [],
  },
  component: ButtonComponent,
  props: {
    title: text('title', 'Button'),
    style: text('style', ''),
  },
});
