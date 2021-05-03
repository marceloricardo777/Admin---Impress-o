/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
import { message } from "antd";
import moment from "moment";
import { getCepData } from "../service";

export function getDateFromMoment(created_at: string): Date {
  const date = new Date()

  const created = moment(created_at, "YYYY-MM-DD HH:mm:ss")

  date.setFullYear(created.year(), created.month() + 1, created.date())
  date.setHours(created.hour(), created.minute(), created.second())

  return date
}

export function checkDateFieldData(date: string[]) {
  let newDay = "";
  let newMonth = "";
  let newYear = "";

  if (date.length > 1) {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < date[0].length; index++) {
      // eslint-disable-next-line radix
      const element = parseInt(date[0].charAt(index));
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(element)) {
        newDay += element;
      }
    }

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < date[1].length; index++) {
      const element = parseInt(date[1].charAt(index));
      if (!isNaN(element)) {
        newMonth += element;
      }
    }

    for (let index = 0; index < date[2].length; index++) {
      const element = parseInt(date[2].charAt(index));
      if (!isNaN(element)) {
        newYear += element;
      }
    }

    if (newDay.length < 2) {
      return 1
    } if (newMonth.length < 2) {
      return 1
    } if (newYear.length < 4) {
      return 1
    }
    return 0


  }
  return 1

}

export function date1IsAfterOrEqualThenDate2(date1: Date, date2: Date) {
  const timeDate1 = date1
  const timeDate2 = new Date()
  timeDate2.setFullYear(date2.getFullYear(), date2.getMonth(), date2.getDate() - 1)

  return timeDate1.getTime() > timeDate2.getTime()
}

export async function buscarCep(value: any) {
  // limpar mascara
  const cepvalue = value.toString().replace('.', '').replace('-', '')
  if (cepvalue.length === 8) {
    const response = await getCepData(cepvalue)

    if (response.data.erro === true) {
      message.error('CEP não encontrado');
      return undefined
    }
    return (response.data);


  } if (cepvalue.length < 8) {
    message.error('CEP incompleto');
    return undefined
  }
};
