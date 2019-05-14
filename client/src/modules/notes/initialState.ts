import {EntityList, NoteEntityDto} from 'template-common';
import {LoadingProperty, NotLoaded} from 'types/LoadingProperty';

export default {
  notes: NotLoaded as LoadingProperty<EntityList<NoteEntityDto>>,

  editNote: NotLoaded as LoadingProperty<NoteEntityDto>,
  createdNote: NotLoaded as LoadingProperty<NoteEntityDto>,
  deletedNote: NotLoaded as LoadingProperty<NoteEntityDto>,
};
