import {APPLICATION_TITLE} from 'src/config';

export default function(title: string) {
  document.title = APPLICATION_TITLE + ' - ' + title;
}
