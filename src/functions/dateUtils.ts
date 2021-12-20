import { format, parseISO } from "date-fns";

const formatFromISO = (datetime: string, toFormat: string) =>
  format(parseISO(datetime), toFormat);

export { formatFromISO };
