import {EntityList, NoteEntityDto} from 'template-common';
import LoadingProperty, {Empty} from 'types/LoadingProperty';

export default {
  notes: Empty as LoadingProperty<EntityList<NoteEntityDto>>,

  editNote: Empty as LoadingProperty<NoteEntityDto>,
  createdNote: Empty as LoadingProperty<NoteEntityDto>,
  deletedNote: Empty as LoadingProperty<NoteEntityDto>,
};
