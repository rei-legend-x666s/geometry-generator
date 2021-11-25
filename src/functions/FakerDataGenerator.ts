import * as fakerLib from "faker";
import { DATA_TYPE_VALUE } from "../constants/column-format";
import { IColumnProperties, IGisColumnOptions, Locale } from "../types/general";

export interface IFakerDataGeneratorOptions {
  randomSeed: number;
  locale: Locale;
}

class FakerDataGenerator {
  private faker: Faker.FakerStatic;

  constructor(options?: Partial<IFakerDataGeneratorOptions>) {
    this.faker = fakerLib;
    if (options) {
      const { randomSeed, locale } = options;
      if (randomSeed) {
        this.faker.seed(randomSeed);
      }
      if (locale) {
        this.faker.setLocale(locale);
      }
    }
  }

  createFirstName = () => this.faker.name.firstName();

  createLastName = () => this.faker.name.lastName();

  createLatitude = (randomNumber: number, { range }: IGisColumnOptions) => {
    return (
      this.shiftRange(randomNumber, range[0] * 10000000, range[1] * 10000000) /
      10000000
    );
  };

  createLongitude = (randomNumber: number, { range }: IGisColumnOptions) => {
    return (
      this.shiftRange(randomNumber, range[0] * 10000000, range[1] * 10000000) /
      10000000
    );
  };

  shiftRange = (num: number, min: number, max: number) =>
    min + (Math.abs(num) % (max + 1 - min));

  createData = (
    { dataFormat, options }: IColumnProperties,
    randomNumber: number
  ) => {
    let data = null;
    switch (dataFormat) {
      case DATA_TYPE_VALUE.FIRST_NAME:
        data = this.createFirstName();
        break;
      case DATA_TYPE_VALUE.LAST_NAME:
        data = this.createLastName();
        break;
      case DATA_TYPE_VALUE.LATITUDE:
        data = this.createLatitude(randomNumber, options as IGisColumnOptions);
        break;
      case DATA_TYPE_VALUE.LONGITUDE:
        data = this.createLongitude(randomNumber, options as IGisColumnOptions);
        break;
    }
    return data;
  };
}

export default FakerDataGenerator;
