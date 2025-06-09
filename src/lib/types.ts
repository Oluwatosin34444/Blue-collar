export interface ArtisanSignUpData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  artisanImage?: File | null;
  password: string;
}

export interface UserSignUpData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  userImage?: File | null;
}

export interface ArtisanSignUpResponse {
  message: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  service: string;
  location: string;
  artisanImage: string;
  booked: boolean;
  id: string;
  success: boolean;
}

export interface UserSignUpResponse {
  message: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  location: string;
  id: string;
  userImage: string;
  success: boolean;
}

//Let user login and get user profile return the same type
export interface UserProfileResponse {
  token: string;
  message: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  location: string;
  id: string;
  firstName: string;
  lastName: string;
  userImage: string;
  success: boolean;
  active: boolean;
}

//Let artisan login and get artisan profile return the same type
export interface ArtisanProfileResponse {
  token: string;
  message: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  id: string;
  firstName: string;
  lastName: string;
  service: string;
  location: string;
  artisanImage: string;
  booked: boolean;
  success: boolean;
  active: boolean;
}

//Let user update profile expect this file type
export type UserUpdateProfileData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  active: boolean;
  userImage: File | string | null;
};

export interface PasswordUpdateResponse {
  message: string;
  success: boolean;
}

export type Review = {
  comment: string;
  rating: number;
  username: string;
};

export interface BookingOrder {
  _id: string
  booked_by: string
  booking_date: string
  artisanId: string
  service_type: string
  state: number
}
