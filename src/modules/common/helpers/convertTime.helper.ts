import { Injectable } from '@nestjs/common';

@Injectable()
export class ConvertTimeHelper {
    // convert number to hours (00:00)
    minutesToReadableTime(minutes: number): string {
        const roundHours = Math.floor(minutes / 60);
        const roundMinutes = minutes - roundHours * 60;

        const readableHours = roundHours < 10 ? `0${roundHours}` : String(roundHours);
        const readableMinutes = roundMinutes < 10 ? `0${roundMinutes}` : String(roundMinutes);

        return `${readableHours}:${readableMinutes}`;
    }

    readableTimeToMinutes(time: string): number {
        const [hour, minute] = time.split(':');

        if (!minute) return Number(hour) * 60;
        const minutesTotal = Number(hour) * 60 + Number(minute);

        return minutesTotal;
    }
}
