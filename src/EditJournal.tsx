import React from "react";
import { JournalData, Tag } from "./App";
import {JournalForm} from './JournalForm';
import { useJournal } from "./JournalLayout";

type EditJournalProps = {
  onSubmit: (id:string, data: JournalData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function EditJournal({onSubmit, onAddTag, availableTags }:
     EditJournalProps) {
      const journal = useJournal();
  return (
    <>
    <h1 className="mb-4">Edit Journal</h1>
    <JournalForm
      title={journal.title}
      markdown={journal.markdown}
      tags={journal.tags}
      onSubmit={data => onSubmit(journal.id, data)}
      onAddTag={onAddTag}
      availableTags={availableTags}/>
    </>
  )
}