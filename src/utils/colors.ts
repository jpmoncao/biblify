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

const darkThemeColorHighlightBible = [
    'bg-blue-600',
    'bg-yellow-600',
    'bg-teal-600',
    'bg-green-600',
    'bg-red-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-emerald-600',
    'bg-orange-600',
    'bg-cyan-600',
    'bg-lime-600',
    'bg-sky-600',
    'bg-slate-600',
];

const lightThemeColorHighlightBible = [
    'bg-blue-300',
    'bg-yellow-300',
    'bg-teal-300',
    'bg-green-300',
    'bg-red-300',
    'bg-purple-300',
    'bg-pink-300',
    'bg-indigo-300',
    'bg-emerald-300',
    'bg-orange-300',
    'bg-cyan-300',
    'bg-lime-300',
    'bg-sky-300',
    'bg-slate-300',
];

export function getColors(theme: string): string[] {
    switch (theme) {
        case 'dark':
            return darkThemeSolids;
        case 'ocean':
            return darkThemeSolids;
        case 'ancient':
            return lightThemeSolids;
        case 'naranga':
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
        case 'naranga':
            return lightThemeSolidsHighlight;
        default:
            return lightThemeSolidsHighlight;
    }
}

export function getHighlightColorsBible(theme: string): string[] {
    switch (theme) {
        case 'dark':
            return darkThemeColorHighlightBible;
        case 'ocean':
            return darkThemeColorHighlightBible;
        case 'ancient':
            return lightThemeColorHighlightBible;
        case 'naranga':
            return lightThemeColorHighlightBible;
        default:
            return lightThemeColorHighlightBible;
    }
}