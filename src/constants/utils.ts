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
