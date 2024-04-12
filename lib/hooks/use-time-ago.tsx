const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

const getSecondsDiff = (timestamp: number) => (Date.now() - timestamp) / 1000
const getUnitAndValueDate = (secondsElapsed: number) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }
}

type RelativeTimeFormatUnit =
  | "year"
  | "years"
  | "quarter"
  | "quarters"
  | "month"
  | "months"
  | "week"
  | "weeks"
  | "day"
  | "days"
  | "hour"
  | "hours"
  | "minute"
  | "minutes"
  | "second"
  | "seconds";

const getTimeAgo = (timestamp: number, locale: string) => {
  const rtf = new Intl.RelativeTimeFormat(locale)

  const secondsElapsed = getSecondsDiff(timestamp)
  const unitAndValueDate = getUnitAndValueDate(secondsElapsed)

  if (!unitAndValueDate) {
    throw new Error('Unable to calculate time difference');
  }

  const { value, unit } = unitAndValueDate
  return rtf.format(value, unit as RelativeTimeFormatUnit)
}

export default function TimeAgo({ timestamp }: { timestamp: number }) {
  const locale = 'es-CL'
  const timeago = getTimeAgo(timestamp, locale)

  const date = new Date(timestamp)
  const formattedDate = new Intl.DateTimeFormat(locale, {
    month: 'long', day: 'numeric'
  }).format(date)

  return <time title={formattedDate} dateTime={formattedDate}>{timeago}</time>
}
