import React, { useState } from 'react';
import Note from '../Note/Note';
import styles from './Home.module.scss';
import { RiQuillPenFill } from 'react-icons/ri';
import AddNote from '../AddNote/AddNote';

const Home = () => {
	const [notes, setNotes] = useState([]);
	const [isAddNoteActive, setAddNoteActive] = useState(false);

	return (
		<main className={styles.main}>
			<div id='notes' className={styles.notes}>
				{notes.map(note => {
					return <Note key={note.id} id={note.id} title={note.title} text={note.text} color={note.color} notes={notes} setNotes={setNotes} />;
				})}
			</div>

			<AddNote setNotes={setNotes} isAddNoteActive={isAddNoteActive} />

			<button onClick={() => setAddNoteActive(!isAddNoteActive)} className={styles[`add-btn`]}>
				<RiQuillPenFill />
			</button>
		</main>
	);
};

export default Home;
