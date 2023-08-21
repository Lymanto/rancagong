const truncate = (input: string) =>
  input?.length > 200 ? `${input.substring(0, 154)}...` : input;
const truncateTitle = (input: string) =>
  input?.length > 50 ? `${input.substring(0, 50)}...` : input;

export { truncate, truncateTitle };
