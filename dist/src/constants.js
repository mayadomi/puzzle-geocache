export const DEFAULT_PUZZLE_OPTIONS = {
    board: {
        className: '',
        columns: 4,
        height: 500,
        outlineStrokeColor: '#bbb',
        rows: 5,
        scatterArea: 0,
        showBoardSlotOutlines: true,
        snapThreshold: 20,
        width: 400,
    },
    checkLocalStorage: false,
    onComplete: () => { },
    onRefresh: () => { },
    puzzlePiece: {
        strokeColor: 'gold',
        strokeEnabled: true,
    },
    puzzle: {
        className: '',
        responsive: true,
        timer: {
            className: '',
            enabled: false,
        },
        refreshButton: {
            className: '',
            enabled: false,
        },
        rowsAndColumns: {
            className: '',
            enabled: false,
        },
    },
};
export const PUZZLE_GEOCACHE_STORAGE_KEY = 'puzzle-geocache';
export const STROKE_WIDTH = 2;
//# sourceMappingURL=constants.js.map