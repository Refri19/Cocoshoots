
import React from "react";
import {prisma} from '@/lib/prisma'


export default async function AdminPage() {
    const login = await prisma.login.findMany({});

    return (
        <ul>
            {login.map(user => (
                <li key={user.id}>{user.username}</li>
            ))}
        </ul>
    )
}