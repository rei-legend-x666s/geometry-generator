export const NEW_LINE_CODE = {
  LF: {
    label: "LF",
    code: "\n",
  },
  CRLF: {
    label: "CRLF",
    code: "\r\n",
  },
};

export const CRS_VALUE = {
  EPSG_3857: "EPSG:3857",
  EPSG_4326: "EPSG:4326",
};

export type CRS_VALUE = typeof CRS_VALUE[keyof typeof CRS_VALUE];

export const DATE_FORMAT = {
  TYPE1: "yyyy-MM-dd'T'HH:mm:ss",
  TYPE2: "yyyy/MM/dd HH:mm:ss",
  TYPE3: "yyyy/MM/dd",
  TYPE4: "yyyyMMddHHmmss",
};
