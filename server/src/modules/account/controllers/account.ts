import {AccountEntityDto} from 'template-common';
import accountToAccountDto from '../../../types/mappers/accountToAccountDto';
import {Controller, ok} from '../../../utils/ControllerBuilder';

const profileController: Controller<undefined, AccountEntityDto> = async ({account}) =>
  ok(accountToAccountDto(account!, true));

export default profileController;
