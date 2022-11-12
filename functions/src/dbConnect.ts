import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import {secrets} from './secrets'

export default function dbConnect() {
  if(!getApps().length) {
    initializeApp({
      credential: cert(secrets)
    })
  }
  return getFirestore()
}