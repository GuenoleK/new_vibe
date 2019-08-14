import axios from 'axios';
const apiUrl = 'api/roles';
class RoleApi {
  getRoleByUserAndStructure = (userId: number, structureId: number) =>
    axios.get(`${apiUrl}/${userId}/${structureId}`).then(response => response.data);
}

export const roleAPi = new RoleApi();
