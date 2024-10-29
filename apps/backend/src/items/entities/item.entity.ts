import { User } from 'src/users/entities/user.entity';

export class Item {
  id: Number;
  title: String;
  description: String;
  price: Number;
  images: String[];
  locationId: Number;
  status: any;
  adDuration: any;
  ownerId: Number;
  createdAt: Date;
  updatedAt: Date;

  advertisement: any;
  requests: any;
  chats: any;
  size: any;
  location: any;
  owner: User;
}
