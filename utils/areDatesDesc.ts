export default function areDatesDesc(dates: Date[] | undefined) {
  if(!dates || dates.length === 0) return false;

  for (let i = 0; i < dates?.length - 1; i++) {
    const current = new Date(dates[i]);
    const next = new Date(dates[i + 1]);

    if (current < next) {
      return false;
    }
  }
  return true;
}