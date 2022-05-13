import React,{useContext} from 'react'
import NoteContext from '../context/notes/noteContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const { note,updateNote } = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">

                <div className="card-body">
                    <div className="d-flex">
                        <h5 className="card-title">{note.title}</h5>
                        <i className='mx-2' onClick={()=>{deleteNote(note._id); props.showAlert("Delete Note Successfully!","sucess");}}><DeleteIcon /></i>
                        <i className='mx-2' onClick={()=>(updateNote(note))}><EditIcon /></i>

                    </div>


                    <p className="card-text">{note.description}</p>

                </div>
            </div>

        </div>
    )
}

export default NoteItem