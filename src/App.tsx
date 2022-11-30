import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import { NewJournal } from "./NewJournal"
import { useLocalStorage } from "./useLocalStorage"
import { v4 as uuidV4 } from "uuid"
import { JournalList } from "./JournalList"
import { JournalLayout } from "./JournalLayout"
import { EditJournal } from "./EditJournal"
import { Journal } from "./Journal"

export type Journal = {
  id: string
} & JournalData

export type RawJournal = {
  id: string
} & RawJournalData

export type RawJournalData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type JournalData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [journals, setJournals] = useLocalStorage<RawJournal[]>("JOURNALS", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const journalsWithTags = useMemo(() => {
    return journals.map(journal => {
      return { ...journal, tags: tags.filter(tag => journal.tagIds.includes(tag.id)) }
    })
  }, [journals, tags])

  function onCreateJournal({ tags, ...data }: JournalData) {
    setJournals(prevJournals => {
      return [
        ...prevJournals,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  function onUpdateJournal(id: string, { tags, ...data }: JournalData){
    setJournals(prevJournals => {
      return prevJournals.map(journal => {
          if (journal.id === id){
            return{...journal, ...data, tagIds: tags.map(tag => tag.id)}
          }else{
            return journal
          }
        })
      
    })
  }

  function onDeleteJournal(id: string) {
    setJournals(prevJournals => {
      return prevJournals.filter(journal => journal.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <JournalList
              journals={journalsWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewJournal
              onSubmit={onCreateJournal}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<JournalLayout journals={journalsWithTags} />}>
          <Route index element={<Journal onDelete={onDeleteJournal} />} />
          <Route
            path="edit"
            element={
              <EditJournal
                onSubmit={onUpdateJournal}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
          }
        
export default App