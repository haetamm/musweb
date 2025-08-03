import {
  CollaborationDeleteRequest,
  CollaborationRequest,
} from '@/stores/collaboration';
import axios from 'axios';

export class ClientCollaborationAction {
  static async createCollaboration(
    data: CollaborationRequest
  ): Promise<string[]> {
    const response = await axios.post('/api/collaboration/create', data);
    return response.data.collaborations;
  }

  static async deleteCollaboration(
    data: CollaborationDeleteRequest
  ): Promise<string> {
    const response = await axios.delete('/api/collaboration/delete', { data });
    return response.data.message;
  }
}
