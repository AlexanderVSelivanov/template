import {AccountDto} from 'template-common';
import accountToAccountDto from '../../../types/mappers/accountToAccountDto';
import {Controller, ok} from '../../../utils/ControllerBuilder';

const profileController: Controller<undefined, AccountDto> = async ({account}) =>
  ok(accountToAccountDto(account!, true));

export default profileController;
