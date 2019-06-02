import { configure } from '@storybook/react';
const stories = require.context('../src/stories', true, /.stories.tsx$/);

function loadStories() {
  stories.keys().forEach(stories);
}

configure(loadStories, module);
