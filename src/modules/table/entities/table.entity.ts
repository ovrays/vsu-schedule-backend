export enum TableSheet {
    BACHELORS = 'Расписание (бак., спец.)',
    MAGISTRACY = 'Расписание (маг.)'
}

export interface TableMerge {
    value: string;

    start: TableCell;
    end: TableCell;
}

export interface TableCell {
    column: number;
    row: number;

    value: string;
}

export interface RawTableMerge {
    s: {
        c: number
        r: number
    },
    e: {
        c: number
        r: number
    }
}

export const TableColumns = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];