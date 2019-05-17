import {EntityList, NoteEntityDto} from 'template-common';
import {LoadProperty, NotLoaded} from 'types/LoadProperty';

export default {
  notes: NotLoaded as LoadProperty<EntityList<NoteEntityDto>>,

  editNote: NotLoaded as LoadProperty<NoteEntityDto>,
  createdNote: NotLoaded as LoadProperty<NoteEntityDto>,
  deletedNote: NotLoaded as LoadProperty<NoteEntityDto>,
};
