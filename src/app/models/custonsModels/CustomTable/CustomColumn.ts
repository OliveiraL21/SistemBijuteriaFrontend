export default class Column {
  field: string;
  header: string;
  filter: boolean;
  classes: string[];


  constructor(field: string, header: string, filter: boolean = false, classes: string[] = []) {
    this.field = field;
    this.header = header;
    this.filter = filter;
    this.classes = classes;
  }
}
