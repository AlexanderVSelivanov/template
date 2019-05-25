import {Empty, EmptyOr, AsyncProperty, EditAsyncProperty, EntityList, NoteEntityDto} from 'template-common';

export default {
  notes: Empty as EmptyOr<AsyncProperty<EntityList<NoteEntityDto>>>,
  editNote: Empty as EmptyOr<EditAsyncProperty<NoteEntityDto>>,
};
