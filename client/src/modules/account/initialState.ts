import {Empty, EmptyOr, TokenDto, AccountEntityDto} from 'template-common';

export default {
  token: Empty as EmptyOr<TokenDto>,
  currentAccount: Empty as EmptyOr<AccountEntityDto>,
};
