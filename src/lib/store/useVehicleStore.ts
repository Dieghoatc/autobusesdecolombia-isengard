import { create } from 'zustand'
import type { VehicleResponse } from '../../services/types/vehicle-response'

interface VehicleStore {
  vehicleResponse: VehicleResponse;
  error: string | null;
  isLoading: boolean;
  setVehicleResponse: (vehicleResponse: VehicleResponse) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicleResponse: {info: {count: 0, currentPage: 0, pages: 0, limit: 0, next: '', prev: '', hasNext: false, hasPrev: false, startItem: 0, endItem: 0}, data: []},
  error: null,
  isLoading: false,
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setVehicleResponse: (vehicleResponse) => set({ vehicleResponse }),
}))