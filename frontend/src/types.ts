interface Message {
  messageID: string;
  message: string;
  userID: string;
  createDate?: Date; // Opcional, se a data de criação for opcional
  toUser: string;
}

interface User {
  username: string;
  password: string;
}

export type { Message, User };
