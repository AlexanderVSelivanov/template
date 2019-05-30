import {Empty, EmptyOr, AsyncProperty, EntityList, NoteEntityDto} from 'template-common';

export default {
  notes: Empty as EmptyOr<AsyncProperty<EntityList<NoteEntityDto>>>,
  note: Empty as EmptyOr<AsyncProperty<NoteEntityDto>>,
  createdNote: Empty as EmptyOr<AsyncProperty<NoteEntityDto>>,
  updatedNote: Empty as EmptyOr<AsyncProperty<NoteEntityDto>>,
  deletedNote: Empty as EmptyOr<AsyncProperty<NoteEntityDto>>,
};
