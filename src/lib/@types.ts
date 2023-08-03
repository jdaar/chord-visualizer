export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'
export type ChordType = 'dim' | 'maj' | 'min' | 'aug'

export type ChordString = `${Note}${ChordType}${number | ''}`

export type Intervals = {
    [key in ChordType]: Array<number>
}

export type Chord = {
    base_note: Note
    intervals: Array<number>
    inversion: number
}