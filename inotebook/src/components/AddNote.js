import React, { useState, useContext } from 'react';
import  NoteContext  from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: '', description: '', tag: ''});

    const onSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: '', description: '', tag: ''});
        props.showAlert("Added Successfully!","sucess");
       
    }

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }



    return (
        <div className="container my-3">


            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange}  minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange}  />
                </div>
                
                <button disabled={note.title.length < 4 || note.description.length<4} type="submit" onClick={onSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddNote