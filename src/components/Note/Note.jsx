import React, { useState } from 'react';
import styles from './Note.module.scss';
import { RiDeleteBinFill } from 'react-icons/ri';
import { RiPushpinFill } from 'react-icons/ri';
import { RiUnpinFill } from 'react-icons/ri';

const Note = ({ id, title, text, color, notes, setNotes }) => {
	const [posX, setPosX] = useState(0);
	const [posY, setPosY] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [isPinned, setIsPinned] = useState(false);

	const [dragStyle, setDragStyle] = useState({});

	const dragStart = e => {
		setPosX(e.screenX - e.currentTarget.getBoundingClientRect().left);
		setPosY(e.screenY - e.currentTarget.getBoundingClientRect().top);
		setIsDragging(true);
	};

	const dragging = e => {
		if (isDragging) {
			const left = e.screenX - posX;
			const top = e.screenY - posY;

			const note = e.currentTarget;
			document.getElementById('notes').appendChild(note);

			if (!isPinned) {
				setDragStyle({
					position: 'absolute',
					zIndex: 1000,
					left: left,
					top: top,
				});
			}
		}
	};

	const dragEnd = () => {
		setIsDragging(false);
	};

	const removeNote = () => {
		const copyNotes = [...notes];
		const newNotes = [...copyNotes.filter(note => note.id !== id)];

		setNotes(newNotes);
	};

	const placeAbove = e => {
		const note = e.currentTarget;
		document.getElementById('notes').appendChild(note);
	};

	return (
		<div
			style={dragStyle}
			className={isPinned ? `${styles.note} ${styles[`note--${color}`]} ${styles[`note--fixed`]}` : `${styles.note} ${styles[`note--${color}`]}`}
			onMouseDown={e => dragStart(e)}
			onMouseMove={e => dragging(e)}
			onMouseUp={() => dragEnd()}
			onClick={e => placeAbove(e)}
		>
			<div className={styles.top}>
				<button
					onClick={() => setIsPinned(prev => !prev)}
					className={isPinned ? `${styles[`pin-button`]} ${styles[`pin-button--active`]}` : styles[`pin-button`]}
					id='pin-btn'
				>
					{!isPinned && <RiPushpinFill />}
					{isPinned && <RiUnpinFill />}
				</button>
			</div>

			<div className={styles.note__content}>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.text}>{text}</p>
			</div>

			<div className={styles.bottom}>
				<button onClick={() => removeNote()} className={styles[`remove-button`]} id='remove-btn'>
					<RiDeleteBinFill className={styles[`icon-trash`]} />
				</button>
			</div>
		</div>
	);
};

export default Note;
