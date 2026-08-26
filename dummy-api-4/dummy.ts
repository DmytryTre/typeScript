import axios from "axios";

enum Gender {
  Female = "female",
  Male = "male",
}

enum USState {
  MS = "Mississippi",
  AL = "Alabama",
  NV = "Nevada",
  WI = "Wisconsin",
  NH = "New Hampshire",
  PA = "Pennsylvania",
}

enum BloodGroup {
  O_Negative = "O-",
  B_Positive = "B+",
  AB_Positive = "AB+",
}

enum EyeColor {
  Green = "Green",
  Red = "Red",
  Hazel = "Hazel",
  Amber = "Amber",
}

enum Roles {
  User = "user",
  Admin = "admin",
}

interface FetchUsersParams {
  limit?: number;
  skip?: number;
}

interface ResponseSuccess extends FetchUsersParams {
  total: number;
  users: User[];
}

interface Address {
  address: string;
  city: string;
  state: USState;
  stateCode: keyof typeof USState;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: BloodGroup;
  height: number;
  weight: number;
  eyeColor: EyeColor;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: Address;
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: Roles;
}

type Res = ResponseSuccess | unknown;

const fetchCoffeeByIdApi = async ({
  limit,
  skip,
}: FetchUsersParams): Promise<Res> => {
  try {
    const { data } = await axios.get<ResponseSuccess>(
      "https://dummyjson.com/users",
      {
        params: {
          limit: limit,
          skip: skip,
        },
      },
    );
    return data;
  } catch (error) {
    if (error instanceof Error) {
      generateError(error.message);
    }
    generateError("Неизвестная ошибка при запросе");
  }
};

function generateError(message: string): never {
  throw new Error(message);
}

const start = async () => {
  const data = await fetchCoffeeByIdApi({ limit: 10 });
  console.log(data);
};

start();
