import * as fakerLib from "@faker-js/faker";
import { format } from "date-fns";
import { DATA_TYPE_VALUE } from "../constants/column-format";
import { ColumnOptions, IColumnProperties, Locale } from "../types/general";
import RandomGenerator from "./RandomGenerator";
import {
  isDatetimeColumnOptions,
  isGisColumnOptions,
  isNumberRangeColumnOptions,
} from "./customTypeGaurd";

export interface IFakerDataGeneratorOptions {
  seed: number;
  locale: Locale;
}

class FakerDataGenerator {
  private faker: Faker.FakerStatic;
  private randomGenerator: RandomGenerator;

  constructor(options?: Partial<IFakerDataGeneratorOptions>) {
    this.faker = fakerLib.default;
    this.randomGenerator = new RandomGenerator();
    if (options) {
      const { seed, locale } = options;
      if (seed) {
        this.randomGenerator = new RandomGenerator(seed);
        this.faker.seed(seed);
      }
      if (locale) {
        this.faker.setLocale(locale);
      }
    }
  }

  createFirstName = () => this.faker.name.firstName();

  createLastName = () => this.faker.name.lastName();

  createLatitude = (options: ColumnOptions) => {
    if (!isGisColumnOptions(options)) return null;
    const {
      range: { xMinMax },
    } = options;
    const [min, max] = xMinMax;
    return this.shiftRange(this.randomGenerator.next(), min, max);
  };

  createLongitude = (options: ColumnOptions) => {
    if (!isGisColumnOptions(options)) return null;
    const {
      range: { yMinMax },
    } = options;
    const [min, max] = yMinMax;
    return this.shiftRange(this.randomGenerator.next(), min, max);
  };

  createDatetime = (options: ColumnOptions) => {
    if (!isDatetimeColumnOptions(options)) return null;
    const {
      range: { min, max },
      format: optFormat,
    } = options;
    const opt = {
      min: min ? min : undefined,
      max: max ? max : undefined,
    };
    const date = this.faker.datatype.datetime(opt);
    return format(date, optFormat);
  };

  createPointGeometry = (options: ColumnOptions) => {
    if (!isGisColumnOptions(options)) return null;
    const {
      range: { xMinMax, yMinMax },
    } = options;
    const [xRandomNumber, yRandomNumber] = this.createRandomNumber(2);
    const latitude = this.shiftRange(xRandomNumber, xMinMax[0], xMinMax[1]);
    const longitude = this.shiftRange(yRandomNumber, yMinMax[0], yMinMax[1]);
    return [latitude, longitude];
  };

  createNumber = (options: ColumnOptions) => {
    if (!isNumberRangeColumnOptions(options)) return null;
    const {
      range: { min, max },
    } = options;
    const opt = {
      min: min ? min : undefined,
      max: max ? max : undefined,
    };
    return this.faker.datatype.number(opt);
  };

  createRandomNumber = (count: number) => {
    return [...Array(count)].map((_) => this.randomGenerator.next());
  };

  shiftRange = (num: number, min: number, max: number) =>
    min + Math.abs(num) * (max - min);

  private dataCreateFunctions = {
    [DATA_TYPE_VALUE.NONE]: () => null,
    [DATA_TYPE_VALUE.LAST_NAME]: this.createLastName,
    [DATA_TYPE_VALUE.FIRST_NAME]: this.createFirstName,
    [DATA_TYPE_VALUE.LATITUDE]: this.createLatitude,
    [DATA_TYPE_VALUE.LONGITUDE]: this.createLongitude,
    [DATA_TYPE_VALUE.GEOMETRY_POINT]: this.createPointGeometry,
    [DATA_TYPE_VALUE.DATETIME]: this.createDatetime,
    [DATA_TYPE_VALUE.DATE]: this.createDatetime,
    [DATA_TYPE_VALUE.NUMBER]: this.createNumber,
  };

  createData = ({ dataFormat, options }: IColumnProperties) => {
    return this.dataCreateFunctions[dataFormat](options);
  };
}

export default FakerDataGenerator;
