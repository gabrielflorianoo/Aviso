interface Message {
    messageID: string;
    message: string;
    userID: string;
    creatDate?: Date; // Opcional, se a data de criação for opcional
}

interface User {
    username: string;
    password: string;
}

export type { Message, User };
