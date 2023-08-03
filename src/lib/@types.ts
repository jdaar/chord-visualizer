export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
export type ChordType = 'dim' | 'maj' | 'min' | 'aug';

export type ChordString = `${Note}${ChordType}${string | ''}`;

export type Intervals = {
	[key in ChordType]: Array<number>;
};

export type Chord = {
	base_note: Note;
	intervals: Array<number>;
	inversion: number;
};

export type Language = 'br' | 'es' | 'en';
export type LanguageDictionary = {
	no_chord: string;
	reset_intervals: string;
	add_interval: string;
	add_chord_intervals: string;
	chord_type_label: string;
	interval_label: string;
	base_note_label: string;
};
