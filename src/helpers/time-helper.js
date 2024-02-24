import { DateTime } from "luxon";

export default {
    methods: {
        getRuLuxonDateTimeFromISOString(isoString) {
            return DateTime.fromISO(isoString).setLocale('ru');
        },

        getFormattedDateFromISOString(isoString) {
            return this.getRuLuxonDateTimeFromISOString(isoString).toFormat('DDD');
        },
        getFormattedTimeFromISOString(isoString) {
            return this.getRuLuxonDateTimeFromISOString(isoString).toFormat('T');
        },
        getFormattedDateTimeFromISOString(isoString) {
            return this.getRuLuxonDateTimeFromISOString(isoString).toFormat('fff');
        }
    }
}