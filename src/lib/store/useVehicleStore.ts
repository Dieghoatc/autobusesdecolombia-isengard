import { create } from 'zustand'
import type { VehicleResponse } from '../../services/types/vehicle-response'

interface Author {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
} 


interface VehicleStore {
  vehicleResponse: VehicleResponse;
  error: string | null;
  isLoading: boolean;
  setVehicleResponse: (vehicleResponse: VehicleResponse) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;

  buffer: ArrayBuffer | null;
  setPhotoStore: (buffer: ArrayBuffer) => void;
  authorStore: Author;
  setAuthorStore: (author: Author) => void;
  cityStore: City;
  setCityStore: (city: City) => void;
}

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicleResponse: {info: {count: 0, currentPage: 0, pages: 0, limit: 0, next: '', prev: '', hasNext: false, hasPrev: false, startItem: 0, endItem: 0}, data: []},
  error: null,
  isLoading: false,
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setVehicleResponse: (vehicleResponse) => set({ vehicleResponse }),

  buffer: null,
  setPhotoStore: (buffer) => set({ buffer }),
  authorStore: { id: '', name: '' },
  setAuthorStore: (author) => set({ authorStore: author }),
  cityStore: { id: '', name: '' },
  setCityStore: (city) => set({ cityStore: city }),
}))