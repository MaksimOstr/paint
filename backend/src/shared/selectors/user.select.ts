import { Prisma, User } from "@prisma/client";

export const userSelect: Prisma.UserSelect = {
    id: true,
    username: true,
    role: true,
    email: true
}