import admin from 'firebase-admin'

export const initializeFirebase = () => {
  if (admin.apps.length) {
    return admin.app()
  }

  const projectId = process.env.FIREBASE_PROJECT_ID
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL

  if (!projectId || !privateKey || !clientEmail) {
    throw new Error('Missing Firebase credentials in environment variables')
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      privateKey,
      clientEmail
    } as any),
  })

  console.log('✅ Firebase initialized')
  return admin.app()
}

export const getDb = () => admin.firestore()
export const getAuth = () => admin.auth()
