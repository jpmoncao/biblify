const lightThemeSolidsHighlight = ['#ffe83f', '#ed4c5c', '#ff75c3', '#ffa647', '#9fff5b', '#70e2ff', '#cd93ff', '#E2E2E2',];
const darkThemeSolidsHighlight = ['#dd0f24', '#ff1c73', '#ff701d', '#c5a806', '#0bdd63', '#0872c9', '#530994', '#525252',];

const lightThemeSolids = ['#000000', '#3b3b3b', '#9c0c1a', '#a60761', '#e66407', '#ccb021', '#50a016', '#10a2c7', '#6920a8',];
const darkThemeSolids = ['#fffdfd', '#d3d3d3', '#dd4e5d', '#f046a6', '#fd9636', '#ffda22', '#94eb56', '#67d2ec', '#a86ddb',];

const darkThemeColorHighlightBible = [
    { blue: 'bg-blue-600' },
    { yellow: 'bg-yellow-600' },
    { teal: 'bg-teal-600' },
    { green: 'bg-green-600' },
    { red: 'bg-red-600' },
    { purple: 'bg-purple-600' },
    { pink: 'bg-pink-600' },
    { indigo: 'bg-indigo-600' },
    { emerald: 'bg-emerald-600' },
    { orange: 'bg-orange-600' },
    { cyan: 'bg-cyan-600' },
    { lime: 'bg-lime-600' },
    { sky: 'bg-sky-600' },
    { slate: 'bg-slate-600' },
];

const lightThemeColorHighlightBible = [
    { blue: 'bg-blue-300' },
    { yellow: 'bg-yellow-300' },
    { teal: 'bg-teal-300' },
    { green: 'bg-green-300' },
    { red: 'bg-red-300' },
    { purple: 'bg-purple-300' },
    { pink: 'bg-pink-300' },
    { indigo: 'bg-indigo-300' },
    { emerald: 'bg-emerald-300' },
    { orange: 'bg-orange-300' },
    { cyan: 'bg-cyan-300' },
    { lime: 'bg-lime-300' },
    { sky: 'bg-sky-300' },
    { slate: 'bg-slate-300' },
];

const backgroundColors = [
    'blue-300',
    'yellow-300',
    'teal-300',
    'green-300',
    'red-300',
    'purple-300',
    'pink-300',
    'indigo-300',
    'emerald-300',
    'orange-300',
    'cyan-300',
    'lime-300',
    'sky-300',
    'slate-300',
];

export function getColors(theme: string): string[] {
    switch (theme) {
        case 'dark':
        case 'ocean':
            return darkThemeSolids;
        case 'ancient':
        case 'naranga':
        default:
            return lightThemeSolids;
    }
}

export function getHighlightColors(theme: string): string[] {
    switch (theme) {
        case 'dark':
        case 'ocean':
            return darkThemeSolidsHighlight;
        case 'ancient':
        case 'naranga':
        default:
            return lightThemeSolidsHighlight;
    }
}

export function getHighlightColorsBible(theme: string): string[] {
    let colorsArray;

    switch (theme) {
        case 'dark':
        case 'ocean':
            colorsArray = darkThemeColorHighlightBible;
            break;
        case 'ancient':
        case 'naranga':
        default:
            colorsArray = lightThemeColorHighlightBible;
            break;
    }

    return colorsArray.map((colorObj) => Object.keys(colorObj)[0]);
}

export function getClassNameHighlightColorBible(theme: string, color: string): string {
    let colorsArray;

    switch (theme) {
        case 'dark':
        case 'ocean':
            colorsArray = darkThemeColorHighlightBible;
            break;
        case 'ancient':
        case 'naranga':
        default:
            colorsArray = lightThemeColorHighlightBible;
            break;
    }

    const colorObj = colorsArray.find((obj) => Object.keys(obj)[0] === color);

    return colorObj ? Object.values(colorObj)[0] : '';
}

export function getRandomBackgroundColor(): string {
    const randomIndex = Math.floor(Math.random() * backgroundColors.length);
    return backgroundColors[randomIndex];
}
