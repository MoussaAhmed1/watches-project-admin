export type Position = {
  lat: number;
  lng: number;
};

export interface MapData {
    coords: Position;
    address: {
      add_ar: string;
      add_en: string;
    };
  }