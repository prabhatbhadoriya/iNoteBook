import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {

  // const host = "http://localhost:4000";
  const notesInitial =[]
  const [notes, setNotes] = useState(notesInitial);


   // get notes from server
   const getNotes = async () => {
    const res = await fetch(`/notes/allnotes`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
      }
  });
  // console.log(localStorage.getItem("token"));

    const data = await res.json();
      setNotes(data);
  }
 




  // Add a note
  const addNote = async(title, description, tag) => {
    const res2 = await fetch(`/notes/addnote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag
      })      
  });
  // console.log(localStorage.getItem("token"));

    const note = await res2.json();
    setNotes(notes.concat(note));
  }


  // Delete a note
  const deleteNote = async(id) => {
    
      const res2 = await fetch(`/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
          }
      });
      const deletedata = await res2.json();
       if (res2.status === 422 || !deletedata) {
          console.log("error");
      } 
      // console.log(localStorage.getItem("token"));
      
    setNotes(notes.filter(note => note._id !== id));
  }


  // Edit a note
  const editNote = async (id, title, description, tag) => {
     const res2 = await fetch(`/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag
      })
  });
  // console.log(res2);

    setNotes(notes.map(note => (note._id === id ? { ...note, title, description, tag } : note)));

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}

    </NoteContext.Provider>
  );
}

export default NoteState;