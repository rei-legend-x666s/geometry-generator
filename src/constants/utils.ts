export const NEW_LINE_CODE = {
  LF: "\n",
  CRLF: "\r\n",
} as const;

export type NEW_LINE_CODE = typeof NEW_LINE_CODE[keyof typeof NEW_LINE_CODE];
