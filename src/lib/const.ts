import type { ChordType, Intervals, Language, LanguageDictionary, Note } from './@types';

const dim = [3, 6];

const aug = [4, 8];

const min = [3, 7];

const maj = [4, 7];

export const notes: Array<Note> = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const chord_types: Array<ChordType> = ['aug', 'dim', 'maj', 'min'];

export const intervals: Intervals = {
	maj,
	min,
	aug,
	dim
};

type AnglosaxonLatinNotes = {
	[key: string]: string;
};
export const anglosaxon_latin_notes: AnglosaxonLatinNotes = {
	C: 'Do',
	D: 'Re',
	E: 'Mi',
	F: 'Fa',
	G: 'Sol',
	A: 'La',
	B: 'Si'
};

export const language_dictionaries: { [key in Language]: LanguageDictionary } = {
	br: {
		no_chord: 'Nenhum acorde foi identificado',
		reset_intervals: 'Redefinir intervalos',
		add_interval: 'Adicionar intervalo',
		add_chord_intervals: 'Adicionar intervalos de acorde',
		chord_type_label: 'Tipo de acorde',
		interval_label: 'Intervalo',
		base_note_label: 'Nota de base',
		latin_label: 'Mudar para a notação latina',
		anglo_label: 'Mudar para a notação anglo-saxônica'
	},
	en: {
		no_chord: 'No chord was identified',
		reset_intervals: 'Reset intervals',
		add_interval: 'Add interval',
		add_chord_intervals: 'Add chord intervals',
		chord_type_label: 'Chord type',
		interval_label: 'Interval',
		base_note_label: 'Base note',
		latin_label: 'Change to latin notation',
		anglo_label: 'Change to anglo-saxon notation'
	},
	es: {
		no_chord: 'No se identifico un acorde',
		reset_intervals: 'Restablecer intervalos',
		add_interval: 'Añadir intervalo',
		add_chord_intervals: 'Añadir intervalos del acorde',
		chord_type_label: 'Tipo de acorde',
		interval_label: 'Intervalo',
		base_note_label: 'Nota base',
		latin_label: 'Cambiar a notacion latina',
		anglo_label: 'Cambiar a notacion anglosajona'
	}
};
