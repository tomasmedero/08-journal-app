import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../firebase/config'

export const LoadNotes = async (uid = '') => {
  if (!uid) throw new Error('El UID no existe')

  const collecitionRef = collection(FirebaseDB, `${uid}/journal/notes`)

  const docs = await getDocs(collecitionRef)

  const notes = []
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() })
  })

  return notes
}
