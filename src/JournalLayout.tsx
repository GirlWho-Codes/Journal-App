import React from "react";
import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
// import {Navigate} from "react-router-dom";
import { Journal } from "./App";




type JournalLayoutProps = {
    journals: Journal[]
}

export function JournalLayout({journals}: JournalLayoutProps){
    const {id} = useParams()

    const journal = journals.find(j => j.id === id)

    if(journal === null) return <Navigate to="/" replace/>

    return <Outlet context={journal}/>
}

export function useJournal(){
    return useOutletContext<Journal>()
}