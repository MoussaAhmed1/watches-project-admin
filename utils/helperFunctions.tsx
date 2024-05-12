import moment from "moment";


//conveting to format 12.356.25
export function formatNumber(number: number): string {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat();
  return formatter.format(number);
}

//time in local
export function parseToLocal(date: string, time: boolean = false) {
  if (date === "") return "-";
  let options: any = { year: "numeric", month: "short", day: "numeric" };
  const localDate = getLocalTime(date);
  if (time) options = { ...options, hour12: true, hour: "numeric", minute: "numeric" };
  let dateObj = new Date(localDate).toLocaleString("en-US", options);
  return dateObj;
}
//time in utc
export function parstToUtc(date: string, time: boolean = false) {
  if (date === "") return "-";
  let options: any = { year: "numeric", month: "short", day: "numeric" };
  const localDate = getUtcTime(date);
  if (time) options = { ...options, hour12: true, hour: "numeric", minute: "numeric" };
  let dateObj = new Date(localDate).toLocaleString("en-US", options);
  return dateObj;
}

export function getLocalTime(utcTime: string): Date {
  const utcDate = new Date(utcTime); // Create a new Date object from the UTC time
  const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000); // Convert the UTC time to local time
  return localDate;
}
export function getUtcTime(utcTime: string): Date {
  const utcDate = new Date(utcTime);
  const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60 * 1000); // Convert the UTC time to local time
  return localDate;
}
export function getDateString(date: Date): string {
  return moment(date).format().slice(0, -6);
}


export const Captalize = (word: any) => {
  if (typeof word == "string")
    return word.toLowerCase().charAt(0).toUpperCase() + word.substring(1);
  return word;
};

export function shortenText(text: string,length:number=30): string {
  if (text?.length <= length) {
      return text; // If text is already 20 characters or less, return it as is
  } else {
      return text?.slice(0, length-3) + '...'; // Slice the text to get the first 17 characters and add three dots
  }
}

export function formatCreatedAtDate(created_at: string): string {
 return getLocalTime(created_at).toLocaleDateString("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
})
}
export function formatCreatedAtDateAsDateTime(created_at: string): string {
 return parseToLocal(created_at,true)
}


