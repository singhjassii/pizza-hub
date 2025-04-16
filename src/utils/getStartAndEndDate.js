export default function getStartAndEndDate(days, startDate) {
  const start = new Date(startDate);
  const endDate = new Date(start);
  endDate.setDate(start.getDate() + days);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    startDate: formatDate(start),
    endDate: formatDate(endDate),
  };
}
// export function getStartAndEndDateRaw(days, startDateInput) {
//   const pad = (num, size = 2) => String(num).padStart(size, '0');

//   const formatToIST = (date) => {
//     const indiaTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
//     return indiaTime;
//   };

//   // Helper to format the date and time
//   const formatDateTime = (date, endOfDay = false) => {
//     const year = date.getFullYear();
//     const month = pad(date.getMonth() + 1);
//     const day = pad(date.getDate());
//     const hours = endOfDay ? 23 : 0;
//     const minutes = endOfDay ? 59 : 0;
//     const seconds = endOfDay ? 59 : 0;
//     const milliseconds = endOfDay ? 999 : 0;

//     return `${year}-${month}-${day} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)} IST`;
//   };

//   // Start Date in IST
//   const startDate = formatToIST(new Date(startDateInput));
//   const endDate = new Date(startDate);
//   endDate.setDate(startDate.getDate() + days);

//   // Get formatted start and end times
//   return {
//     startDate: formatDateTime(startDate, false), // 00:00:00.000
//     endDate: formatDateTime(endDate, true), // 23:59:59.999
//   };
// }
