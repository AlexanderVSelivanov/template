import {APPLICATION_TITLE} from 'config';

export default function(title: string) {
  document.title = APPLICATION_TITLE + ' - ' + title;
}
