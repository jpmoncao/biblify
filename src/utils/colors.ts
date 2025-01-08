const lightThemeSolidsHighlight = [
    '#E2E2E2',
    '#ed4c5c',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
]
const darkThemeSolidsHighlight = [
    '#525252',
    '#dd0f24',
    '#ff1c73',
    '#ff701d',
    '#c5a806',
    '#0bdd63',
    '#0872c9',
    '#530994',
]

const lightThemeSolids = [
    '#000000',
    '#3b3b3b',
    '#9c0c1a',
    '#a60761',
    '#e66407',
    '#ccb021',
    '#50a016',
    '#10a2c7',
    '#6920a8',
]

const darkThemeSolids = [
    '#fffdfd',
    '#d3d3d3',
    '#dd4e5d',
    '#f046a6',
    '#fd9636',
    '#ffda22',
    '#94eb56',
    '#67d2ec',
    '#a86ddb',
]

export function getColors(theme: string): string[] {
    switch (theme) {
        case 'dark':
            return darkThemeSolids;
        case 'ocean':
            return darkThemeSolids;
        case 'ancient':
            return lightThemeSolids;
        case 'naranja':
            return lightThemeSolids;
        default:
            return lightThemeSolids;
    }
}

export function getHighlightColors(theme: string): string[] {
    switch (theme) {
        case 'dark':
            return darkThemeSolidsHighlight;
        case 'ocean':
            return darkThemeSolidsHighlight;
        case 'ancient':
            return lightThemeSolidsHighlight;
        case 'naranja':
            return lightThemeSolidsHighlight;
        default:
            return lightThemeSolidsHighlight;
    }
}