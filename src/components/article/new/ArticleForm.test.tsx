import { render, waitFor } from "@testing-library/react";
import * as stories from "./ArticleForm.stories";
import { composeStories } from "@storybook/react";

const { NewArticle, EditArticle } = composeStories(stories);

document.execCommand = jest.fn();
const mockDispatch = jest.fn();
const mockSelector = jest.fn();
const mockRouter = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: () => mockRouter
}));

const user = {
  id: 1
};

describe("<ArticleForm />", () => {
  mockSelector.mockReturnValue({
    id: user.id
  });
  mockRouter.mockReturnValue({});

  it("새로운 게시글을 작성하는 컴포넌트", async () => {
    const component = render(<NewArticle />);
    await waitFor(() => expect(component).toMatchSnapshot());
  });

  it("기존 게시글을 수정하는 컴포넌트", async () => {
    const component = render(<EditArticle />);
    await waitFor(() => expect(component).toMatchSnapshot());
  });
});
