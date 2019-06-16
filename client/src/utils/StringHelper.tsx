import React from 'react';
import {EmptyOr, isEmpty} from 'template-common';

export function highlightText(text: string, highlightedText: EmptyOr<string>) {
  if (!isEmpty(highlightedText)) {
    const reg = new RegExp(highlightedText, 'gi');
    const result = text.replace(reg, str => `<mark>${str}</mark>`);
    return <span dangerouslySetInnerHTML={{__html: result}}/>;
  }
  return text;
}
