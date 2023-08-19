const truncate = (input: string) =>
  input?.length > 200 ? `${input.substring(0, 154)}...` : input;

export default truncate;
