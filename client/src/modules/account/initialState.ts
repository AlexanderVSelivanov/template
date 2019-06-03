import {Empty, EmptyOr, AsyncProperty, TokenDto, AccountEntityDto} from 'template-common';

export default {
  token: Empty as EmptyOr<AsyncProperty<TokenDto>>,
  currentAccount: Empty as EmptyOr<AsyncProperty<AccountEntityDto>>,
};
