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

export interface City {
  id?: string;
  name?: string;
  name_ar: string;
  name_en: string;
  code: string;
  order_by: number | string;
}
