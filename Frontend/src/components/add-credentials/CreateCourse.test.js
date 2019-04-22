import React from "react";
import { shallow } from "enzyme";
import MyComponent from "./CreateCourse";
describe("CreateCourse", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<MyComponent debug />);

    expect(component).toMatchSnapshot();
  });
});
