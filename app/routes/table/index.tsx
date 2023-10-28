import TableComponent from './Table';
import { PLAYER_DATA } from './data';

export type Column = {
    accessor: string;
    label: string;
    format?: (value: any) => any;
}

const columns: Column[] = [
    { accessor: 'first_name', label: 'First Name' },
    { accessor: 'last_name', label: 'Last Name' },
    { accessor: 'positions', label: 'Position' },
    { accessor: 'email', label: 'Email' },
    { accessor: 'phone', label: 'Phone' },
    { accessor: 'goals_scored', label: 'Goals Scored' },
    { accessor: 'assists', label: 'Assists' },
    { accessor: 'minutes_played', label: 'Minutes Played' },
    { accessor: 'shots_on_goal', label: 'Shots On Goal' },
    { accessor: 'shots_off_target', label: 'Shots Off Target' },
    { accessor: 'pass_completion_percent', label: 'Pass Completion %', format: value => `${value * 100}%` },
    { accessor: 'tackles', label: 'Tackles' },
    { accessor: 'interceptions', label: 'Interceptions' },
    { accessor: 'fouls_committed', label: 'Fouls Committed' },
    { accessor: 'fouls_received', label: 'Fouls Received' },
    { accessor: 'yellow_cards', label: 'Yellow Cards' },
    { accessor: 'red_cards', label: 'Red Cards' },
    { accessor: 'saves', label: 'Saves' },
    { accessor: 'clean_sheets', label: 'Clean Sheets' },
    { accessor: 'height', label: 'Height' },
    { accessor: 'weight', label: 'Weight' },
    { accessor: 'distance_covered', label: 'Distance Covered (km)' },
    { accessor: 'speed_forty_yards', label: 'Forty Yard Dash' },
    { accessor: 'endurance_beep_test', label: 'Beep Test' },
    { accessor: 'strength_bench_press', label: 'Bench Press' },
    { accessor: 'notes', label: 'Notes' },
]

const Table = () => {

    return (
        <TableComponent rows={PLAYER_DATA} columns={columns} />
    )
}

export default Table;