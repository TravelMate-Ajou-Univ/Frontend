import { render } from "@testing-library/react";
import ArticleForm from "./ArticleForm";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();
const mockRouter = jest.fn();
const mockUseState = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: () => mockRouter
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: () => mockUseState()
}));

const user = {
  id: 1
};

describe("<ArticleForm />", () => {
  it("should render correctly", () => {
    mockSelector.mockReturnValue({
      id: user.id
    });
    mockRouter.mockReturnValue({});
    mockUseState
      .mockImplementationOnce(() => ["title", mockUseState])
      .mockImplementationOnce(() => ["content", mockUseState])
      .mockImplementationOnce(() => ["서울", mockUseState])
      .mockImplementationOnce(initial => [initial, mockUseState])
      .mockImplementationOnce(() => [
        [
          { id: 1, name: "keyword1" },
          { id: 2, name: "keyword2" }
        ],
        mockUseState
      ])
      .mockImplementation(initial => [initial, mockUseState]);

    const component = render(<ArticleForm />);

    expect(component).toMatchSnapshot();
  });
});
