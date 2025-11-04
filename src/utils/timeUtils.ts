export function getCurrentTimeLog(): string {
  return new Date().toLocaleString('vi-VN');
}

export function getDateNow() {
  return Date.now(); //returns the current timestamp in milliseconds
}