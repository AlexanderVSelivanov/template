import {ApplicationError, IdDto, NoteDto, NoteEntityDto, EntityListRequest, EntityList} from 'template-common';

import {
  getNotesCreator,
  getNoteByIdCreator,
  createNoteCreator,
  updateNoteByIdCreator,
  deleteNoteByIdCreator,
} from './types';

export const getNotesAction = getNotesCreator<EntityListRequest, EntityList<NoteEntityDto>, ApplicationError>();
export const getNoteByIdAction = getNoteByIdCreator<IdDto, NoteEntityDto, ApplicationError>();
export const createNoteAction = createNoteCreator<NoteDto, NoteEntityDto, ApplicationError>();
export const updateNoteByIdAction = updateNoteByIdCreator<NoteDto, NoteEntityDto, ApplicationError>();
export const deleteNoteByIdAction = deleteNoteByIdCreator<IdDto, NoteEntityDto, ApplicationError>();
