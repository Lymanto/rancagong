type AparaturType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  position: string;
  imageUrl: string;
  imageId: string;
};

type NewsType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  imageId: string;
};
type ScheduleType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  imageUrl: string;
  imageId: string;
  date: Date;
  url: string;
  location: string;
};
type UMKMType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  address: string;
  imageUrl: string;
  imageId: string;
  whatsAppUrl?: string;
  goFoodUrl?: string;
  grabFoodUrl?: string;
  tokopediaUrl?: string;
  shopeeUrl?: string;
  instagramUrl?: string;
  ttUrl?: string;
};
export type { NewsType, AparaturType, ScheduleType, UMKMType };
