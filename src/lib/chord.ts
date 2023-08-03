import type { Chord, ChordString, ChordType, Note } from './@types';
import { anglosaxon_latin_notes, chord_types, intervals, notes } from './const';

export function get_chord_type(chord: Chord): ChordType {
	const chord_intervals = chord['intervals'];
	const chord_type = chord_types.filter((type) =>
		intervals[type].every((note_interval) => chord_intervals.includes(note_interval))
	);
	return chord_type[0];
}

export function chord_to_string(chord: Chord): ChordString {
	const is_triad = chord['intervals'].length < 3;
	let chord_string: ChordString;
	if (is_triad) {
		chord_string = `${chord['base_note']}${get_chord_type(chord)}`;
	} else {
		const chord_type_intervals = intervals[get_chord_type(chord)];
		const extension = chord['intervals'].filter(
			(value) => !chord_type_intervals.includes(value)
		)[0];
		chord_string = `${chord['base_note']}${get_chord_type(chord)}${extension ?? ''}`;
	}
	return chord_string;
}

export function interval_to_note(base_note: Note, interval: number): Note {
	const note_index = notes.indexOf(base_note);
	const is_another_octave = note_index + interval >= notes.length;
	return is_another_octave
		? notes[note_index + interval - notes.length]
		: notes[note_index + interval];
}

export function anglo_to_latin(note: Note) {
	return `${anglosaxon_latin_notes[note[0]]}${note[1] ?? ''}`;
}
