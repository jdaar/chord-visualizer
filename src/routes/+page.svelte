<script lang="ts">
	import type { Chord, ChordType, Language, LanguageDictionary, Note } from '$lib/@types';
	import { anglo_to_latin as _anglo_to_latin, chord_to_string, interval_to_note } from '$lib/chord';
	import { intervals, language_dictionaries, notes } from '$lib/const';
	import { writable } from 'svelte/store';
	import '../styles.css';

	let chord = writable<Chord>({
		base_note: 'A',
		intervals: [],
		inversion: 0
	});

	let language = writable<Language>('es');
	let language_dictionary: LanguageDictionary = language_dictionaries[$language];
	$: language_dictionary = language_dictionaries[$language];

    type Notation = 'la' | 'an'
    let notation = writable<Notation>('la')

    let anglo_to_latin: typeof _anglo_to_latin = (note) => note;
    $: {
        if ($notation == 'an') {
            anglo_to_latin = _anglo_to_latin
        } else {
            anglo_to_latin = (note) => {
                return note
            }
        }
    }

	function on_change_note(value: Note) {
		$chord = {
			...$chord,
			base_note: value
		};
	}
	function on_add_interval(value: number) {
		if (!$chord['intervals'].includes(value) && value != 0) {
			$chord = {
				...$chord,
				intervals: [...$chord['intervals'], value]
			};
			$chord['intervals'].sort((a, b) => a - b);
		}
	}
	function on_reset_intervals() {
		$chord = {
			...$chord,
			intervals: []
		};
	}
	function on_language_change(_language: Language) {
		$language = _language;
	}
	function on_notation_change(_notation: Notation) {
		$notation = _notation;
	}

	type BaseNoteOption = {
		value: Note;
		label: string;
	};
    let base_note_options: Array<BaseNoteOption> = []
    $: {
        base_note_options = notes.map((value, idx) => ({
            value: value,
            label: value[1] == undefined ? anglo_to_latin(value) : `${anglo_to_latin(value)}/${anglo_to_latin(notes[idx + 1 >= notes.length ? idx : idx + 1])}♭`
        }));
    }
	let selected_base_note: Note;

	type IntervalOption = {
		value: number;
		label: string;
	};
	let interval_options: Array<IntervalOption> = [];
	let selected_interval: number;

	type ChordTypeOption = {
		value: Array<number>;
		label: string;
	};
	let chord_type_options: Array<ChordTypeOption> = Object.keys(intervals).map((value) => ({
		value: intervals[value as ChordType],
		label: value
	}));
	let selected_chord_type: Array<number>;

	$: {
		if (selected_base_note !== undefined) {
			on_change_note(selected_base_note);
			interval_options = new Array(11).fill(1).reduce(
				(acc, _, idx) => [
					...acc,
					{
						value: idx + 1,
						label: anglo_to_latin(interval_to_note(selected_base_note, idx + 1))
					}
				],
				[]
			);
		}
	}

    let stringified_chord = language_dictionary['no_chord']
    $: {
        const is_valid_chord = !chord_to_string($chord).includes('undefined') 
        let temp_chord_str: string;
        if (is_valid_chord) {
            temp_chord_str = chord_to_string($chord)
            temp_chord_str = temp_chord_str.includes('#') ? 
                `${anglo_to_latin(temp_chord_str.slice(0, 2) as Note)}${temp_chord_str.slice(2)}`
                : 
                `${anglo_to_latin(temp_chord_str.slice(0, 1) as Note)}${temp_chord_str.slice(1)}`;
        } else {
            temp_chord_str = language_dictionary['no_chord']
        }
        stringified_chord = temp_chord_str
    }
</script>

<button
	class="language"
	on:click={() => {
		on_language_change($language == 'br' ? 'es' : $language == 'es' ? 'en' : 'br');
	}}
>
	{$language == 'br' ? '🇧🇷' : $language == 'es' ? '🇪🇸' : $language == 'en' ? '🇺🇸' : 'none'}
</button>
<button
	class="notation"
	on:click={() => {
		on_notation_change($notation == 'an' ? 'la' : 'an')
	}}
>
    { $notation == 'an' ? language_dictionary['latin_label'] : language_dictionary['anglo_label'] }
</button>
<div class="display">
	<div class="form">
		<div class="field">
			<label for="base_note">
				{language_dictionary['base_note_label']}
			</label>
			<select name="base_note" id="base_note" bind:value={selected_base_note}>
				{#each base_note_options as base_note_option}
					<option value={base_note_option['value']}>
						{base_note_option['label']}
					</option>
				{/each}
			</select>
			<button
				on:click={() => {
					on_reset_intervals();
				}}>{language_dictionary['reset_intervals']}</button
			>
		</div>

		<div class="field">
			<label for="interval">
				{language_dictionary['interval_label']}
			</label>
			<select name="interval" id="interval" bind:value={selected_interval}>
				{#each interval_options as interval_option}
					<option value={interval_option['value']}>
						{interval_option['label']} - {interval_option['value']}
					</option>
				{/each}
			</select>
			<button
				on:click={() => {
					on_add_interval(selected_interval);
				}}>{language_dictionary['add_interval']}</button
			>
		</div>

		<div class="field">
			<label for="chord_type">
				{language_dictionary['chord_type_label']}
			</label>
			<select name="chord_type" id="chord_type" bind:value={selected_chord_type}>
				{#each chord_type_options as chord_type_option}
					<option value={chord_type_option['value']}>
						{chord_type_option['label']}
					</option>
				{/each}
			</select>
			<button
				on:click={() => {
					on_reset_intervals();
					for (let i = 0; i < selected_chord_type.length; i += 1) {
						on_add_interval(selected_chord_type[i]);
					}
				}}>{language_dictionary['add_chord_intervals']}</button
			>
		</div>
	</div>
	<h1>
        { stringified_chord }
	</h1>
	<div class="piano">
		{#each notes as note}
			<div class="note_container">
				<div
					class="note"
					class:selected={$chord['intervals']
						.map((value) => interval_to_note($chord['base_note'], value))
						.includes(note) || note == $chord['base_note']}
					class:semitone={(note[1] ?? '') == '#'}
				/>
				<h2>
					{anglo_to_latin(note)}
				</h2>
			</div>
		{/each}
	</div>
</div>

<style>
	* {
		color: #e8eddf;
	}

	h1 {
		text-align: center;
	}

	select {
		background-color: #242423;
		border: none;
		padding: 1em;
		font-size: medium;
		border-radius: 0.5em;
	}

	button {
		border: none;
		padding: 1em;
		font-size: medium;
		background-color: #333533;
		border-radius: 0.5em;
	}

	.note_container {
		width: 100%;
		display: grid;
		justify-content: center;
		align-content: center;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr;
	}

	h2 {
		text-align: center;
	}

	.form {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr;
		gap: 1em;
	}

	label {
		font-weight: 600;
	}

	.field {
		display: grid;
		gap: 1em;
	}

	.display {
		display: grid;
		grid-template-rows: 20% 20% 60%;
		grid-template-columns: 80%;
		justify-content: center;
		align-content: center;
		padding: 1em;
		margin-top: 3em;
	}

	.note {
		color: #333533;
		background-color: #e8eddf;
		height: 5rem;
		border-radius: 0.5em;
		display: grid;
		justify-content: center;
		align-content: center;
	}

	.selected {
		background-color: #f5cb5c !important;
	}

	.semitone {
		background-color: #333533;
		color: #e8eddf;
	}

	.piano {
		background-color: #242423;
		border-radius: 0.5em;
		padding: 1em;
		display: grid;
		gap: 1em;
		grid-template-columns: 1fr 0.3fr 1fr 0.3fr 1fr 1fr 0.3fr 1fr 0.3fr 1fr 0.3fr 1fr;
		grid-template-rows: 1fr;
		margin-bottom: 2em;
	}

	@media (max-width: 860px) {
		.display {
			grid-template-columns: 100%;
		}

		.piano {
			gap: 0.5em;
			grid-template-columns: 1fr 0.5fr 1fr 0.5fr 1fr 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr;
		}

		.note {
			padding: 0.1em;
		}

		.form {
			grid-template-rows: 1fr 1fr 1fr;
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 640px) {
		.piano {
			grid-template-rows: 0.5fr 0.2fr 0.5fr 0.2fr 0.5fr 0.5fr 0.2fr 0.5fr 0.2fr 0.5fr 0.2fr 0.5fr;
			grid-template-columns: 1fr;
		}
	}
</style>
