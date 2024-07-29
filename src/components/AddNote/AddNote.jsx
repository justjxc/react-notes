import React, { useEffect, useRef, useState } from 'react';
import styles from './AddNote.module.scss';

const AddNote = ({ setNotes, isAddNoteActive, setDragStyle }) => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const textAreaRef = useRef(null);
	const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7'];

	useEffect(() => {
		textAreaRef.current.style.height = 'auto';
		textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
	}, [text]);

	const randomColor = () => {
		return colors[Math.floor(Math.random() * colors.length)];
	};

	const addNote = e => {
		e.preventDefault();

		const newNote = {
			id: Math.floor(Math.random() * Date.now()).toString(16),
			title: title,
			text: text,
			color: randomColor(),
		};

		setNotes(prev => [...prev, newNote]);

		setTitle('');
		setText('');
	};

	return (
		<div className={isAddNoteActive ? `${styles['add-note']} ${styles['add-note--active']}` : styles['add-note']}>
			<form className={styles.form} onSubmit={e => addNote(e)}>
				<input className={styles.title} type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Enter title' />

				<textarea ref={textAreaRef} className={styles.text} type='text' value={text} onChange={e => setText(e.target.value)} placeholder='Enter text' />

				<button className={styles.submit} type='submit'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddNote;
