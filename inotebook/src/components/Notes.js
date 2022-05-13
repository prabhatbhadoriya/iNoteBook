
import NoteContext from '../context/notes/noteContext'
import { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const { notes, getNotes,editNote } = context;

 
  useEffect(() => {
    if(localStorage.getItem('token')){

    getNotes();
    }
    else{
      // props.showAlert("Please login first","error");
      navigate('/login');

    }

    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:'', etitle: '', edescription: '', etag: '' });


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});

    // console.log('updateNote', note)

  }


  

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log('onSubmit', note)
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated Successfully!","sucess");

    refClose.current.click();
    
    

  }

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              </button>
            </div>
            <form>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={3} required />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={3} required />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
              </div>
            </div>
            </form>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 4 || note.edescription.length<4} onClick={onSubmit} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">

        <div className="container">
          {notes.length === 0 && "No Notes Available..." }
        </div>



        <h2>Your Notes</h2>
        {notes.map(note => (
          <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>

        ))}




      </div>
    </>
  )
}

export default Notes