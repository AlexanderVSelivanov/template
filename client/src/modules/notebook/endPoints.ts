import {deleteEndPoint, getEndPoint, postEndPoint, putEndPoint} from 'services/endPointService';

import {IdDto, NoteDto, EntityListRequest, EntityList} from 'template-common';

const prefix = '/notebook';

export const getNotesEndPoint = getEndPoint<EntityListRequest, EntityList<NoteDto>>(`${prefix}`);
export const getNoteByIdEndPoint = getEndPoint<IdDto, NoteDto>(`${prefix}/{id}`);
export const createNoteEndPoint = postEndPoint<NoteDto, NoteDto>(`${prefix}`);
export const updateNoteByIdEndPoint = putEndPoint<IdDto & NoteDto, NoteDto>(`${prefix}/{id}`);
export const deleteNoteByIdEndPoint = deleteEndPoint<IdDto, NoteDto>(`${prefix}/{id}`);
