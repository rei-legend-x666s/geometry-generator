import * as fakerLib from "faker";
import { DATA_TYPE_VALUE } from "../constants/column-format";
import { IColumnProperties, IGisColumnOptions, Locale } from "../types/general";
import RandomGenerator from "./RandomGenerator";

export interface IFakerDataGeneratorOptions {
  randomSeed: number;
  locale: Locale;
}

class FakerDataGenerator {
  private faker: Faker.FakerStatic;
  private randomGenerator: RandomGenerator;

  constructor(options?: Partial<IFakerDataGeneratorOptions>) {
    this.faker = fakerLib;
    this.randomGenerator = new RandomGenerator();
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

  createLatitude = (
    randomNumber: number,
    { range: { xMinMax } }: IGisColumnOptions
  ) => {
    return this.shiftRange(randomNumber, xMinMax[0], xMinMax[1]);
  };

  createLongitude = (
    randomNumber: number,
    { range: { yMinMax } }: IGisColumnOptions
  ) => {
    return this.shiftRange(randomNumber, yMinMax[0], yMinMax[1]);
  };

  createPointGeometry = (
    xRandomNumber: number,
    yRandomNumber: number,
    { range }: IGisColumnOptions
  ) => {
    const { xMinMax, yMinMax } = range;
    const latitude = this.shiftRange(xRandomNumber, xMinMax[0], xMinMax[1]);

    const longitude = this.shiftRange(yRandomNumber, yMinMax[0], yMinMax[1]);
    return [latitude, longitude];
  };

  shiftRange = (num: number, min: number, max: number) =>
    min + Math.abs(num) * (max - min);

  createData = ({ dataFormat, options }: IColumnProperties) => {
    let data = null;
    switch (dataFormat) {
      case DATA_TYPE_VALUE.NONE:
        data = null;
        break;
      case DATA_TYPE_VALUE.FIRST_NAME:
        data = this.createFirstName();
        break;
      case DATA_TYPE_VALUE.LAST_NAME:
        data = this.createLastName();
        break;
      case DATA_TYPE_VALUE.LATITUDE:
        data = this.createLatitude(
          this.randomGenerator.next(),
          options as IGisColumnOptions
        );
        break;
      case DATA_TYPE_VALUE.LONGITUDE:
        data = this.createLongitude(
          this.randomGenerator.next(),
          options as IGisColumnOptions
        );
        break;
      case DATA_TYPE_VALUE.GEOMETRY_POINT:
        data = this.createPointGeometry(
          this.randomGenerator.next(),
          this.randomGenerator.next(),
          options as IGisColumnOptions
        );
        break;
    }
    return data;
  };
}

export default FakerDataGenerator;
