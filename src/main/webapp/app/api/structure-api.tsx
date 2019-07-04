import axios from 'axios';

class StructureApi {
  getAllStructures = () => axios.get(`api/structures`).then(response => response.data);
  getAllStructuresNames = () => axios.get(`api/structures/names`).then(response => response.data);
}

export const structureAPi = new StructureApi();
