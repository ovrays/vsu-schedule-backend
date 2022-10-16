import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import * as XLSX from 'xlsx';
import {RawTableMerge, TableCell, TableColumns, TableMerge, TableSheet} from './entities/table.entity';
import {FlowService} from "../flow/flow.service";
import {ScheduleDay} from '../schedule/entities/schedule.entity';
import {ScheduleLessonDto, ScheduleLessonFrequency, ScheduleLessonTime} from "../schedule/entities/schedule.lesson.dto";
import {ScheduleService} from "../schedule/schedule.service";

@Injectable()
export class TableService {
    url: string;

    sheet: any;
    merges: RawTableMerge[];

    constructor(
        private http: HttpService,
        private flowService: FlowService,
        private scheduleService: ScheduleService
    ) {
        const template = process.env.TABLE_TEMPLATE;

        this.url = template.replace('{{ID}}', process.env.TABLE_ID);
    }

    @Cron(CronExpression.EVERY_10_MINUTES)
    async fetch() {
        this.http.get(this.url, {responseType: 'arraybuffer'})
            .subscribe((response) => this.handleResponse(response));
    }

    async handleResponse(response) {
        const table = XLSX.read(response.data, {type: 'buffer'});

        this.sheet = table.Sheets[TableSheet.BACHELORS];
        this.merges = this.sheet['!merges'];

        await this.handleSheet();
    }

    async handleSheet() {
        let flows = await this.flowService.getFlows();

        for (const flow of flows) {
            if (flow.schedule)
                await this.scheduleService.delete(flow.schedule.id)

            flow.schedule = await this.scheduleService.create()
            flow.schedule.entries = []

            for (let i = 1; i <= 7; i++) {
                let day = this.getDay(i)

                flow.schedule.entries.push({ day, lessons: [] })

                for (let tableCellId = 0; tableCellId < 16; tableCellId += 2) {
                    let lessonTime = this.getLessonTime(Math.floor((tableCellId + 2) / 2));

                    let tableOffset = 5 + (i - 1) * 17;

                    let firstCell: TableCell = this.getTableCell(flow.column, tableCellId + tableOffset);
                    let secondCell: TableCell = this.getTableCell(flow.column, tableCellId + tableOffset + 1);

                    let lessons = this.handleCells(lessonTime, firstCell, secondCell)

                    let entry = flow.schedule.entries.find(it => it.day == day)

                    entry.lessons = [ ...entry.lessons, ...lessons]
                }
            }

            await this.scheduleService.save(flow.schedule)
            await this.flowService.save(flow);
        }
    }


    getLessonTime(n: number) {
        return ScheduleLessonTime['L' + n]
    }

    getDay(n: number) {
        return ScheduleDay['D' + n]
    }


    handleCells(lessonTime: ScheduleLessonTime, firstCell: TableCell, secondCell: TableCell): ScheduleLessonDto[] {
        // First and second cells merged
        let cellsMerge: TableMerge = this.getTableCellsMerge(firstCell, secondCell);

        // First cell merged with other cell
        let firstMerge: TableMerge = this.getTableCellsMerge(firstCell, firstCell);

        // Second cell merged with other cell
        let secondMerge: TableMerge = this.getTableCellsMerge(secondCell, secondCell);

        if (cellsMerge && cellsMerge.value)
            return [{time: lessonTime, value: cellsMerge.value, frequency: ScheduleLessonFrequency.ALWAYS}]

        let result = []

        let firstValue = firstCell.value || firstMerge?.value
        let secondValue = secondCell.value || secondMerge?.value

        if (firstValue)
            result.push({time: lessonTime, value: firstValue, frequency: ScheduleLessonFrequency.NUMERATOR});

        if (secondValue)
            result.push({time: lessonTime, value: secondValue, frequency: ScheduleLessonFrequency.DENOMINATOR});

        return result
    }


    getTableCell(column: number, row: number): TableCell {
        let key = this.getTableColumn(column) + row;
        let value = this.sheet[key]?.v;

        // Thanks to some weird schedule creators for spaces in a cell
        if (!value?.trim().length)
            value = undefined;

        return {column, row, value};
    }

    getTableMerge(rawMerge: RawTableMerge): TableMerge {
        let start = this.getTableCell(rawMerge.s.c, rawMerge.s.r + 1);
        let end = this.getTableCell(rawMerge.e.c, rawMerge.e.r + 1);

        let value;

        for (let c = start.column; c <= end.column; c++) {
            for (let r = start.row; r <= end.row; r++) {
                let cell = this.getTableCell(c, r);

                value = value || cell?.value;
            }
        }

        return {start, end, value};
    }

    // An absurdly unoptimized method, thanks to ~~shit~~ sheet.js
    // Returns merge that contains two cells.
    getTableCellsMerge(fCell: TableCell, sCell: TableCell): TableMerge {
        let target: TableMerge = {start: fCell, end: sCell, value: fCell?.value || sCell?.value};

        for (let rawMerge of this.merges) {
            let merge = this.getTableMerge(rawMerge);

            if (merge.start.column <= target.start.column && merge.start.row <= target.start.row && merge.end.column >= target.end.column && merge.end.row >= target.end.row) {
                return merge;
            }
        }

        return undefined;
    }

    getTableColumn(value: number): string {
        let level = Math.ceil(value / TableColumns.length);

        if (level == 1) {
            return TableColumns[value];
        } else {
            let result = '';

            for (let i = 0; i < level; i++) {
                result += TableColumns[Math.min(value, TableColumns.length)];
                value -= TableColumns.length;
            }

            return result;
        }
    }
}
