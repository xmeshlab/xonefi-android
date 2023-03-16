import { create } from 'zustand'
import { get_client_status } from '../api/client';

type ClientStatus = {
    isActive: boolean,
    fetchStatus: () => Promise<any>,
    setStatus:(status: boolean) => void
}


export const useClientStatus = create<ClientStatus>((set) => ({
    isActive: false,
    fetchStatus: async () => {
        const status = await get_client_status();
        set(state => ({
            isActive:status
        }));
        return status;
    },
    setStatus:  (status: boolean) => {
        set(state => ({isActive: status}));
    }
}))
