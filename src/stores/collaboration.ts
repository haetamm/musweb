import { showSuccessToast } from '@/hooks/useHandleToast';
import { ClientCollaborationAction } from '@/lib/action/ClientCollaborationAction';
import { create } from 'zustand';

export interface CollaborationRequest {
  playlistId: string;
  userIds: string[];
}

export interface CollaborationDeleteRequest {
  playlistId: string;
  userId: string;
}

interface CollaborationState {
  loading: boolean;
  createCollaboration: (data: CollaborationRequest) => Promise<void>;
  deleteCollaboration: (data: CollaborationDeleteRequest) => Promise<void>;
}

const useCollaboratorStore = create<CollaborationState>((set) => ({
  loading: false,
  playlistId: '',

  createCollaboration: async (data: CollaborationRequest) => {
    set({ loading: true });
    try {
      await ClientCollaborationAction.createCollaboration(data);
      showSuccessToast('Collaborators added successfully', '');
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteCollaboration: async (data: CollaborationDeleteRequest) => {
    try {
      await ClientCollaborationAction.deleteCollaboration(data);
      showSuccessToast('Collaboration removed successfully.', '');
    } catch (error) {
      throw error;
    }
  },
}));

export default useCollaboratorStore;
