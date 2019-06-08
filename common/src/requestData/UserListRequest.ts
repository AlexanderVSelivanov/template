import EntityListRequest from '../types/EntityListRequest';

type UserListRequest = EntityListRequest & { search?: string }

export default UserListRequest;
