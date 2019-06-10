import {Empty, EmptyOr, AsyncProperty, EntityList, NoteDto} from 'template-common';

export default {
  notes: Empty as EmptyOr<AsyncProperty<EntityList<NoteDto>>>,
  note: Empty as EmptyOr<AsyncProperty<NoteDto>>,
  createdNote: Empty as EmptyOr<AsyncProperty<NoteDto>>,
  updatedNote: Empty as EmptyOr<AsyncProperty<NoteDto>>,
  deletedNote: Empty as EmptyOr<AsyncProperty<NoteDto>>,
};
