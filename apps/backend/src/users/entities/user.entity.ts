export class User {
  id: Number | undefined;
  email: String;
  password: String;
  name: String;
  profileImage: String | undefined;
  createdAt: Date;
  updatedAt: Date;

  advertisement: any;
  items: any;
  message: any;
  requests: any;
  chats: any;
}
