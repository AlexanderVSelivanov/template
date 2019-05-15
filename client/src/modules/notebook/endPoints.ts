import {deleteEndPoint, getEndPoint, postEndPoint, putEndPoint} from 'services/endPointService';

import {IdDto, NoteDto, NoteEntityDto, EntityListRequest, EntityList} from 'template-common';

const prefix = 'notebook';

export const createNoteEndPoint = putEndPoint<NoteDto, NoteEntityDto>(`${prefix}`);
export const deleteNoteByIdEndPoint = deleteEndPoint<IdDto, NoteEntityDto>(`${prefix}/{id}`);
export const getNoteByIdEndPoint = getEndPoint<IdDto, NoteEntityDto>(`${prefix}/{id}`);
export const getNotesEndPoint = getEndPoint<EntityListRequest, EntityList<NoteEntityDto>>(`${prefix}`);
export const updateNoteByIdEndPoint = postEndPoint<NoteDto, NoteEntityDto>(`${prefix}/{id}`);
