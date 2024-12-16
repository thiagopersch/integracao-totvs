import { Pipe, PipeTransform } from "@angular/core";
import dayjs from "dayjs";

@Pipe({
  name: "dateFormatWithHour",
  standalone: true,
})
export class DateFormatWithHourPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return "Não informado";

    const dateFormated = dayjs(value).format("DD/MM/YYYY [às] HH:mm:ss");

    return dayjs(value).isValid() ? dateFormated : "Data inválida";
  }
}
