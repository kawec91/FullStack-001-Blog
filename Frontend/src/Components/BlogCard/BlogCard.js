import { useState } from 'react'
import classes from './BlogCard.module.css'
import readTextFromServer from '../../readTextFromServer';

export default function BlogCard({ titel, text, id }) {
    const [isEditMode, editState] = useState(0);
    const [aktTitel, setTitel] = useState(titel);
    const [aktText, setText] = useState(text);

    function blogEdit() {
        editState(1);
    }
    function blogSave() {
        console.log(aktTitel);
        console.log(aktText);
        readTextFromServer(`http://localhost:8801/blog/edit/${id}/${aktTitel}/${aktText}`, (r) => console.log(r));
        editState(0);
    }

    function blogDelete() {
        readTextFromServer(`http://localhost:8801/blog/entf/${id}`, (r) => {
            console.log(r);
        })
        setTimeout(window.location.reload(), 0.1);
    }
    return <div className={classes.blogCardDiv}>
        <div className={classes.titelDiv}>
            <h3>{isEditMode === 0 ? aktTitel : <input type='text' placeholder={`Aktuell Titel: ${aktTitel}`} onKeyUp={(e) => setTitel(e.target.value)} />}</h3>
            <div className={classes.buttonDiv}>
                {isEditMode === 0 ? <button onClick={blogEdit}>Edit</button> : <button onClick={blogSave}>Speichern</button>}
                <button onClick={blogDelete}>Loschen</button>
            </div>
        </div>

        <p>{isEditMode === 0 ? aktText : <input type='text' placeholder={`Aktuell Text: ${aktText}`} onKeyUp={(e) => setText(e.target.value)} />}</p>
    </div>
}