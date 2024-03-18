export interface ApiResponse {
  status: number;
  message: string;
  data?: any;
}

export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  status: string;
  profesionalRole: string;
  state: string;
  profilePicture: string;
  organization: string;
}
