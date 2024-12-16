import { Pipe, PipeTransform } from "@angular/core";
import { DateFormatWithHourPipe } from "./date-format-with-hour.pipe";

@Pipe({
  name: "formatValues",
  standalone: true,
})
export class FormatValuesPipe implements PipeTransform {
  dateFormat = new DateFormatWithHourPipe();
  getNestedValue(data: any, key: string): any {
    return key.split(".").reduce((o, k) => (o ? o[k] : null), data);
  }
  transform(data: any, key: string, type: string): string {
    const value = this.getNestedValue(data, key);

    switch (type) {
      case "date":
        return this.dateFormat.transform(value);
      case "boolean":
        return value ? "Ativado" : "Desativado";
      case "string":
        return value || "";
      case "number":
        return value !== undefined && value !== null ? value.toString() : "";
      default:
        return value !== undefined && value !== null ? value.toString() : "";
    }
  }
}
