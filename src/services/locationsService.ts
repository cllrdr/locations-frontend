import { LOCATIONS_MOCK } from "../modules/mock";

export interface Locations {
  locationId: number;
  id?: number;
  locationName: string;
  description: string;
  shortDescription: string;
  imagePath: string;
  videoPath: string;
  playersCount: string;
  isDeleted?: boolean;
  similarity?: number;
}

const transformApiLocation = (apiData: any): Locations => ({
  locationId: apiData.id,
  id: apiData.id,
  locationName: apiData.name,
  description: apiData.description,
  shortDescription: apiData.short_description,
  imagePath: apiData.image_path,
  videoPath: apiData.video_path,
  playersCount: apiData.players,
  similarity: 0,
});

export const locationsService = {
  async getLocations(searchQuery?: string): Promise<Locations[]> {
    try {
      const url = new URL("/api/locations", window.location.origin);
      if (searchQuery) url.searchParams.append("location", searchQuery);

      const response = await fetch(url.toString(), {
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      return Array.isArray(data) ? data.map(transformApiLocation) : [];
    } catch {
      return LOCATIONS_MOCK;
    }
  },

  async getLocationById(id: number | string): Promise<Locations | undefined> {
    try {
      const response = await fetch(`/api/locations/${id}`, {
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      return transformApiLocation(data);
    } catch {
      return LOCATIONS_MOCK.find(l => String(l.locationId) === String(id));
    }
  },
};
