// app/actions.ts
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {prisma} from '@/lib/prisma'

export async function handleLogoutAction() {
  const cookieStore = await cookies()
  // This deletes the 'session' cookie that the middleware looks for
  cookieStore.delete('session')
  // Send the user back to the login page
  redirect('/login')
}
