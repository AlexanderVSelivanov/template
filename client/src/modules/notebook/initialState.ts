import {EntityList, NoteEntityDto} from 'template-common';
import {LoadProperty, NotLoaded} from 'types/LoadProperty';
import {EditProperty, Empty} from '../../types/EditProperty';

export default {
  notes: NotLoaded as LoadProperty<EntityList<NoteEntityDto>>,
  editNote: Empty as EditProperty<NoteEntityDto>,
};
