import type { AttendanceMode } from '@/types';

interface Participation {
    attendance_mode?: AttendanceMode;
    is_online?: boolean;
}

export const attendanceLabels: Record<AttendanceMode, string> = {
    in_person: 'Presencial',
    online: 'Online',
    hybrid: 'Híbrido',
};

export function getAttendanceMode(event: Participation): AttendanceMode | undefined {
    if (event.attendance_mode) return event.attendance_mode;
    if (event.is_online === true) return 'online';
    if (event.is_online === false) return 'in_person';
    return undefined;
}

export function matchesAttendanceMode(event: Participation, mode: 'online' | 'in_person'): boolean {
    const attendance = getAttendanceMode(event);
    return attendance === mode || attendance === 'hybrid';
}
