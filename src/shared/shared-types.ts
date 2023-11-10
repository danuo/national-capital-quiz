export type StringObject = { [key: string]: string };
export type ButtonData = {
  label: string;
  state: ButtonStates;
  sessionId: number;
};

export enum ButtonStates {
  Default,
  Selected,
  Done,
  Red,
}
