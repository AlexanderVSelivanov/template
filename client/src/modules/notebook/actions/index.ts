import {ApplicationError, IdDto, NoteDto, EntityListRequest, EntityList} from 'template-common';

import {
  getNotesCreator,
  getNoteByIdCreator,
  createNoteCreator,
  updateNoteByIdCreator,
  deleteNoteByIdCreator,
  setNoteEmptyCreator,
  setCreatedNoteEmptyCreator,
  setUpdatedNoteEmptyCreator,
  setDeletedNoteEmptyCreator,
} from './types';

export const getNotesAction = getNotesCreator<EntityListRequest, EntityList<NoteDto>, ApplicationError>();
export const getNoteByIdAction = getNoteByIdCreator<IdDto, NoteDto, ApplicationError>();
export const createNoteAction = createNoteCreator<NoteDto, NoteDto, ApplicationError>();
export const updateNoteByIdAction = updateNoteByIdCreator<NoteDto, NoteDto, ApplicationError>();
export const deleteNoteByIdAction = deleteNoteByIdCreator<IdDto, NoteDto, ApplicationError>();
export const setNoteEmptyAction = setNoteEmptyCreator();
export const setCreatedNoteEmptyAction = setCreatedNoteEmptyCreator();
export const setUpdatedNoteEmptyAction = setUpdatedNoteEmptyCreator();
export const setDeletedNoteEmptyAction = setDeletedNoteEmptyCreator();
