import type { ChordType, Intervals, Note } from "./@types"

const dim = [
    3,
    6
]

const aug = [
    4,
    8
]

const min = [
    3,
    7
]

const maj = [
    4,
    7
]

export const notes: Array<Note> = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B'
]

export const chord_types: Array<ChordType> = [
    'aug',
    'dim',
    'maj',
    'min'
]

export const intervals: Intervals = {
    maj,
    min,
    aug,
    dim
}

type AnglosaxonLatinNotes = {
    [key: string]: string
}
export const anglosaxon_latin_notes: AnglosaxonLatinNotes = {
    C: 'Do' ,
    D: 'Re',
    E: 'Mi',
    F: 'Fa',
    G: 'Sol',
    A: 'La',
    B: 'Si'
}