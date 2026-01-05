# Procedural Music Generation

The goal of this project is to create novel musical sequences given a seeded random number generator and a set of configurable options. 
<br>
<br>
At the current moment, the metholodogy to achieve this is as follows:
- Generate a sequence of n notes whose pitch is determined by weighted RNG (prioritizing changes in pitch that more frequently occur in actual music)
- For each measure, attempt to find a diatonic chord (the diatonic chords available to use are based off of the melody's scale) that includes all the pitches in the measure. If impossible, attempt to find a chord that includes all the first `(n) - (# of failures)` notes.
- Take each chosen chord and, based off of the 2nd octave, apply a random voicing in the range of `0` to `(# of notes) - (1)` (inclusive)
- Apply transformations to the melody and chord progression to fit them in their respective series of measures
- Merge either series of measures
- Present product to front-end

## Prerequisites
- NodeJS
- Node Package Manager (npm)

## Deployment

In the terminal of your choice
1. Run `npm i` to install the necessary dependencies
2. Run `npm run dev` to start the development server
3. Open http://localhost:3000/ in a browser to access said on-save updating server's webpage