import {deleteEndPoint, getEndPoint, postEndPoint, putEndPoint} from 'services/endPointService';

import {IdDto, NoteDto, NoteEntityDto, EntityListRequest, EntityList} from 'template-common';

const prefix = 'notebook';

export const getNotesEndPoint = getEndPoint<EntityListRequest, EntityList<NoteEntityDto>>(`${prefix}`);
export const getNoteByIdEndPoint = getEndPoint<IdDto, NoteEntityDto>(`${prefix}/{id}`);
export const createNoteEndPoint = postEndPoint<NoteDto, NoteEntityDto>(`${prefix}`);
export const updateNoteByIdEndPoint = putEndPoint<NoteDto, NoteEntityDto>(`${prefix}/{id}`);
export const deleteNoteByIdEndPoint = deleteEndPoint<IdDto, NoteEntityDto>(`${prefix}/{id}`);
