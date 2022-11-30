import React, {FormEvent, useRef, useEffect, useState} from 'react'
import {Form, Stack, Row, Col, Button} from 'react-bootstrap';
import CreatableReactSelect from 'react-select/creatable';
import {Link, useNavigate} from 'react-router-dom';
import {Tag, JournalData} from './App'
import {v4 as uuidv4} from 'uuid'

type JournalFormProps = {
  onSubmit:(data: JournalData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<JournalData>

export function JournalForm({onSubmit, onAddTag, availableTags, title = "", markdown = "", tags=[]}: JournalFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags
    })
    navigate("..")
  }


  return (
    <>
   
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control required ref={titleRef} defaultValue={title}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='tags'>
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                onCreateOption={label => {
                    const newTag = {id: uuidv4(), label}
                    onAddTag(newTag)
                    setSelectedTags(prev => [...prev, newTag])
                }}
                
                value={selectedTags.map(tag => {
                  return {label: tag.label, value: tag.id}
                })} 
                options={availableTags.map(tag => {
                    return {label: tag.label, value: tag.id}
                })}
                onChange={tags => {
                  setSelectedTags(tags.map(tag => {
                    return {label: tag.label, id:tag.value}
                  }))
                }}
                isMulti />
              </Form.Group>
            </Col>
          </Row>
              <Form.Group controlId='markdown'>
                <Form.Label>Body</Form.Label>
                <Form.Control ref={markdownRef} defaultValue={markdown} required as="textarea" rows={15}/>
              </Form.Group>
              <Stack direction='horizontal' gap={2} className="justify-content-end">
                <Button type="submit" variant="danger">Save</Button>
                <Link to="..">
                <Button type="button" variant="outline-secondary">Cancel</Button> 
                </Link>
                 
              </Stack>            
        </Stack>
      </Form>

    </>
  )
}

export default JournalForm