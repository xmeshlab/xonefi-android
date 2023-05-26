import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
import GreyTextInputBar from "../../navigation/Components/GreyTextInputBar";
//import "@testing-library/jest-dom";

//function GreyTextInputBar component
test("Rendering the GreyTextInputBar Component", () => {
  const myMockFn = jest.fn().mockReturnValue("10");
  //function GreyTextInputBar({placeholder_text, state_function}) {
  const { getByText, getByPlaceholderText, getByTestId } = render(
    <GreyTextInputBar placeholder_text={"Testing"} state_function={myMockFn} />
  );
  const textInput = getByPlaceholderText("Testing");
  expect(textInput).not.toBeNull();

  //https://stackoverflow.com/questions/73410630/why-isnt-testing-library-react-native-fireevent-calling-my-onchange-function
  //Text should be changed
  //const TextInput = getByTestId("Text Input");
  //fireEvent.changeText(textInput, "The Text Has Been Changed");
  //expect(textInput.props.value).not.toBeNull();
  //expect(textInput.props.value).toBe("The Text Has Been Changed");
});
