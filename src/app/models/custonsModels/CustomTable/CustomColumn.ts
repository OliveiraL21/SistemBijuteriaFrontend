export default class Column {
  field: string;
  header: string;
  filter: boolean;
  classes: string[];
  filterClasses: string[];


  constructor(field: string, header: string, filter: boolean = false, classes: string[] = [], filterClasses: string[] = []) {
    this.field = field;
    this.header = header;
    this.filter = filter;
    this.classes = classes;
    this.filterClasses = filterClasses;
  }
}
