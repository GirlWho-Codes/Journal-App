import React from "react";
import { JournalData, Tag } from "./App";
import {JournalForm} from './JournalForm';

type NewJournalProps = {
  onSubmit: (data: JournalData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function NewJournal({onSubmit, onAddTag, availableTags }: NewJournalProps) {
  return (
    <>
    <h1 className="mb-4">New Journal</h1>
    <JournalForm onSubmit={onSubmit}  onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  )
}