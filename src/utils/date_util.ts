import { format, parse, differenceInYears } from "date-fns";

export const getAgeFromDate = (birthDate: string): number => {
  try {
    const today = format(new Date(), "MM/yyyy");
    const d = parse(birthDate, "MM/yyyy", new Date());
    const t = format(d, "MM/yyyy");
    const parsedDate1 = parse(today, "MM/yyyy", new Date());
    const parsedDate2 = parse(t, "MM/yyyy", new Date());
    return differenceInYears(parsedDate1, parsedDate2) + 1;
  } catch (error) {
    return 0;
  }
};
