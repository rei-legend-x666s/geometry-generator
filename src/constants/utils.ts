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
  ESPG_3857: "ESPG:3857",
  ESPG_4326: "ESPG:4326",
};

export type CRS_VALUE = typeof CRS_VALUE[keyof typeof CRS_VALUE];
