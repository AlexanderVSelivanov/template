import {EntityList, NoteEntityDto} from 'template-common';
import {EditProperty, Empty} from '../../types/EditProperty';
import {AsyncProperty, EmptyProperty} from '../../types/AsyncProperty';

export default {
  notes: EmptyProperty as AsyncProperty<EntityList<NoteEntityDto>>,
  editNote: Empty as EditProperty<NoteEntityDto>,
};
