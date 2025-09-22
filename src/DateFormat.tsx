export default function DateFormat({ date }: { date: Date | string }) {
  if (typeof date == "string") {
    const newDate = new Date();
    newDate.setTime(Date.parse(date));
    date = newDate;
  }
  return (
    <>
      <div className="date">
        <div className="year">{date.getFullYear()}</div>
        <div className="day">
          {(date.getMonth() + 1).toString().padStart(2, "0")}
          {date.getDate().toString().padStart(2, "0")}
        </div>
      </div>
    </>
  );
}
