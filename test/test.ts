abstract class Logger {
  abstract log(massege: string): void;

  printDate(date: Date) {
    this.log(date.toString());
  }
}

class MessWithData extends Logger {
  log(massege: string) {
    console.log(massege);
  }

  logWithData(massege: string) {
    this.printDate(new Date());
    this.log(massege);
  }
}
