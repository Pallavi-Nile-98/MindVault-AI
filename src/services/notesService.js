// Notes Service - Handles all Firestore operations for notes
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc
} from 'firebase/firestore'
import { db } from '../firebase/config'

const NOTES_COLLECTION = 'notes'

/**
 * Create a new note
 * @param {string} userId - The user's ID
 * @param {string} title - Note title
 * @param {string} content - Note content
 * @returns {Promise<string>} - Document ID of the created note
 */
export const createNote = async (userId, title, content) => {
  try {
    const noteData = {
      userId,
      title,
      content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // embedding will be added by Cloud Function after note creation
      embedding: null
    }

    const docRef = await addDoc(collection(db, NOTES_COLLECTION), noteData)
    return docRef.id
  } catch (error) {
    console.error('Error creating note:', error)
    throw error
  }
}

/**
 * Update an existing note
 * @param {string} noteId - Note document ID
 * @param {string} title - Updated title
 * @param {string} content - Updated content
 */
export const updateNote = async (noteId, title, content) => {
  try {
    const noteRef = doc(db, NOTES_COLLECTION, noteId)
    await updateDoc(noteRef, {
      title,
      content,
      updatedAt: serverTimestamp()
      // Note: Cloud Function will regenerate embedding on update
    })
  } catch (error) {
    console.error('Error updating note:', error)
    throw error
  }
}

/**
 * Delete a note
 * @param {string} noteId - Note document ID
 */
export const deleteNote = async (noteId) => {
  try {
    const noteRef = doc(db, NOTES_COLLECTION, noteId)
    await deleteDoc(noteRef)
  } catch (error) {
    console.error('Error deleting note:', error)
    throw error
  }
}

/**
 * Get all notes for a user
 * @param {string} userId - The user's ID
 * @returns {Promise<Array>} - Array of note objects
 */
export const getUserNotes = async (userId) => {
  try {
    const notesQuery = query(
      collection(db, NOTES_COLLECTION),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    )

    const querySnapshot = await getDocs(notesQuery)
    const notes = []

    querySnapshot.forEach((doc) => {
      notes.push({
        id: doc.id,
        ...doc.data()
      })
    })

    return notes
  } catch (error) {
    console.error('Error fetching notes:', error)
    throw error
  }
}

/**
 * Get a single note by ID
 * @param {string} noteId - Note document ID
 * @returns {Promise<Object>} - Note object
 */
export const getNoteById = async (noteId) => {
  try {
    const noteRef = doc(db, NOTES_COLLECTION, noteId)
    const noteSnap = await getDoc(noteRef)

    if (noteSnap.exists()) {
      return {
        id: noteSnap.id,
        ...noteSnap.data()
      }
    } else {
      throw new Error('Note not found')
    }
  } catch (error) {
    console.error('Error fetching note:', error)
    throw error
  }
}
