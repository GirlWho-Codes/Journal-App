import React from 'react'
import { useJournal } from './JournalLayout'
import {Row, Col, Stack, Badge, Button} from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import  ReactMarkdown  from 'react-markdown';
// import { Journal } from './App';

type JournalProps = {
  onDelete: (id: string) => void
}

export function Journal({onDelete} : JournalProps) {
  const journal = useJournal();
  const navigate = useNavigate()

  return  <>
  <Row className="align-items-center mmb-4">
    <Col>
    <h1> {journal.title} </h1>
    {journal.tags.length > 0 && (
        <Stack
        gap={1}
        direction="horizontal"
        className=" flex-wrap"
      >
        {journal.tags.map(tag => (
          <Badge className="text-truncate bg-danger" key={tag.id}>
            {tag.label}
          </Badge>
        ))}
      </Stack>
    )}
    </Col>
    <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${journal.id}/edit`}>
              <Button variant="danger">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(journal.id)
                navigate("/")
              }}
                
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to='/'>
            <Button variant="outline-secondary">
              Back
            </Button>
            </Link>
            
          </Stack>
        </Col>
  </Row>
  <ReactMarkdown>{journal.markdown}</ReactMarkdown>
  </>
}
