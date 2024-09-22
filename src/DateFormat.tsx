export default function DateFormat({ date }: { date: Date | string }) {
  if (typeof date == 'string') {
    const newDate = new Date();
    newDate.setTime(Date.parse(date));
    date = newDate;
  }
  return (<>
    <span>{date.getFullYear()}</span>
    <span>
      {(date.getMonth() + 1).toString().padStart(2, '0')}
      {date.getDate().toString().padStart(2, '0')}
    </span>
  </>);
}


