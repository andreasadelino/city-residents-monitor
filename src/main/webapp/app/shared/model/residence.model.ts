export interface IResidence {
  id?: number;
  zipcode?: string;
  streetNumber?: string;
  latitude?: number;
  longitude?: number;
  residents?: number;
}

export const defaultValue: Readonly<IResidence> = {};
