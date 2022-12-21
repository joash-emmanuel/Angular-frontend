import { isAfter, isBefore, parse } from "date-fns";
import { Observable } from "rxjs";
import { DataTableResponse } from "../datatable/DataTableResponse";

export class Util {

    /**
     * untested
     * @param timestamp 
     * @returns 
     */
    static timeStampToDate(timestamp: number): Date {
        return new Date(timestamp);
    }

    static normalizeDate(timestamp: number): string {
        let date = new Date(timestamp);

        let month = date.getMonth() + 1;
        let monthString = "" + month;
        if (monthString.length === 1) {
            monthString = "0" + month;
        }


        let dateDateString = "" + date.getDate();
        if (dateDateString.length === 1) {
            dateDateString = "0" + dateDateString;
        }

        return date.getFullYear() + "-" + monthString + "-" + dateDateString;
    }

    static horoscope(dateString: string): String {

        let date: Date = parse(dateString, 'yyyy-MM-dd', new Date());

        if (isAfter(date, Date.parse(date.getFullYear() + "-03-21")) && isBefore(date, Date.parse(date.getFullYear() + "-04-19"))) {
            return "Aries";
        }
        else if (isAfter(date, Date.parse(date.getFullYear() + "-04-20")) && isBefore(date, Date.parse(date.getFullYear() + "-05-20"))) {
            return "Taurus";
        }
        else if (isAfter(date, Date.parse(date.getFullYear() + "-05-21")) && isBefore(date, Date.parse(date.getFullYear() + "-06-20"))) {
            return "Gemini";
        }
        else if (isAfter(date, Date.parse(date.getFullYear() + "-06-21")) && isBefore(date, Date.parse(date.getFullYear() + "-07-22"))) {
            return "Cancer";
        }
        else if (isAfter(date, Date.parse(date.getFullYear() + "-07-23")) && isBefore(date, Date.parse(date.getFullYear() + "-08-22"))) {
            return "Leo";
        }
        else if (isAfter(date, Date.parse(date.getFullYear() + "-08-23")) && isBefore(date, Date.parse(date.getFullYear() + "-09-22"))) {
            return "Virgo";
        }
        else if (isAfter(date, Date.parse(date.getFullYear() + "-09-23")) && isBefore(date, Date.parse(date.getFullYear() + "-10-22"))) {
            return "Libra";
        }
        else if (isAfter(date, Date.parse(date.getFullYear() + "-10-23")) && isBefore(date, Date.parse(date.getFullYear() + "-11-21"))) {
            return "Scorpio";
        }
        else if (isAfter(date, Date.parse(date.getFullYear() + "-11-22")) && isBefore(date, Date.parse(date.getFullYear() + "-12-21"))) {
            return "Sagittarius";
        }
        else if (isAfter(date, Date.parse(date.getFullYear() + "-12-22")) && isBefore(date, Date.parse(date.getFullYear() + "-01-19"))) {
            return "Capricorn";
        }
        else if (isAfter(date, Date.parse(date.getFullYear() + "-01-20")) && isBefore(date, Date.parse(date.getFullYear() + "-02-18"))) {
            return "Aquarius";
        }
        else if (isAfter(date, Date.parse(date.getFullYear() + "-02-19")) && isBefore(date, Date.parse(date.getFullYear() + "-03-20"))) {
            return "Pisces";
        }

        return "";
    }
}