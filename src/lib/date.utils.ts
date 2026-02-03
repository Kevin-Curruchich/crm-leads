import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

/**
 * Get the current date and time
 */
export const now = () => dayjs();

/**
 * Get the current date and time as an ISO string
 */
export const nowISO = () => dayjs().toISOString();

/**
 * Parse a date string or Date object into a dayjs object
 */
export const parseDate = (date: string | Date) => dayjs(date);

/**
 * Format a date string for display with relative time
 * Examples: "2 minutes ago", "3 hours ago", "Yesterday", "Jan 26", "Jan 26, 2025"
 */
export const formatRelativeDate = (dateString: string) => {
  const date = dayjs(dateString);
  const now = dayjs();

  const diffMins = now.diff(date, "minute");
  const diffHours = now.diff(date, "hour");
  const diffDays = now.diff(date, "day");

  // Less than an hour
  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  }

  // Less than a day
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }

  // Yesterday
  if (date.isYesterday()) {
    return "Yesterday";
  }

  // Less than a week
  if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  }

  // Different year
  if (date.year() !== now.year()) {
    return date.format("MMM D, YYYY");
  }

  // Same year
  return date.format("MMM D");
};

/**
 * Format a date in a standard format
 * @param dateString - The date to format
 * @param format - The format string (default: 'MMM D, YYYY')
 */
export const formatDate = (
  dateString: string,
  format: string = "MMM D, YYYY",
) => {
  return dayjs(dateString).format(format);
};

/**
 * Format a date with time
 */
export const formatDateTime = (dateString: string) => {
  return dayjs(dateString).format("MMM D, YYYY h:mm A");
};

/**
 * Get relative time from now
 * Examples: "2 hours ago", "in 3 days"
 */
export const fromNow = (dateString: string) => {
  return dayjs(dateString).fromNow();
};

/**
 * Check if a date is today
 */
export const isDateToday = (dateString: string) => {
  return dayjs(dateString).isToday();
};

/**
 * Check if a date is yesterday
 */
export const isDateYesterday = (dateString: string) => {
  return dayjs(dateString).isYesterday();
};

/**
 * Check if a date is in the past
 */
export const isPast = (dateString: string) => {
  return dayjs(dateString).isBefore(dayjs());
};

/**
 * Check if a date is in the future
 */
export const isFuture = (dateString: string) => {
  return dayjs(dateString).isAfter(dayjs());
};

/**
 * Get the start of a day
 */
export const startOfDay = (dateString?: string) => {
  return (dateString ? dayjs(dateString) : dayjs())
    .startOf("day")
    .toISOString();
};

/**
 * Get the end of a day
 */
export const endOfDay = (dateString?: string) => {
  return (dateString ? dayjs(dateString) : dayjs()).endOf("day").toISOString();
};

/**
 * Add time to a date
 */
export const addTime = (
  dateString: string,
  amount: number,
  unit: "day" | "week" | "month" | "year" | "hour" | "minute",
) => {
  return dayjs(dateString).add(amount, unit).toISOString();
};

/**
 * Subtract time from a date
 */
export const subtractTime = (
  dateString: string,
  amount: number,
  unit: "day" | "week" | "month" | "year" | "hour" | "minute",
) => {
  return dayjs(dateString).subtract(amount, unit).toISOString();
};

/**
 * Get the difference between two dates
 */
export const diffBetween = (
  date1: string,
  date2: string,
  unit: "day" | "week" | "month" | "year" | "hour" | "minute" = "day",
) => {
  return dayjs(date1).diff(dayjs(date2), unit);
};

/**
 * Sort dates in ascending order
 */
export const sortDatesAsc = (dates: string[]) => {
  return dates.sort((a, b) => dayjs(a).diff(dayjs(b)));
};

/**
 * Sort dates in descending order
 */
export const sortDatesDesc = (dates: string[]) => {
  return dates.sort((a, b) => dayjs(b).diff(dayjs(a)));
};
