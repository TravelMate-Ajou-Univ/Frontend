import { waitFor } from "@testing-library/react";
import * as stories from "./ArticleForm.stories";
import { composeStories } from "@storybook/react";
import { initialize } from "@googlemaps/jest-mocks";
import { articleMock } from "@/lib/mockData";
import customRender from "@/test/customRender";
import { axiosMock } from "@/test/axios-mock";

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

beforeEach(() => {
  initialize();
  axiosMock.onGet(`articles/1?userId=0`).reply(200, articleMock);
});

afterEach(() => {
  axiosMock.reset();
});

describe("<ArticleForm />", () => {
  mockSelector.mockReturnValue({
    id: user.id
  });
  mockRouter.mockReturnValue({});

  it("새로운 게시글을 작성하는 컴포넌트", async () => {
    const component = customRender(<NewArticle />);
    await waitFor(() => {
      expect(
        component.getByRole("button", { name: "선택" })
      ).toBeInTheDocument();

      expect(component.getByRole("button", { name: "봄" })).toBeInTheDocument();

      expect(component.getByLabelText("키워드")).toBeInTheDocument();

      expect(component).toMatchSnapshot();
    });
  });

  it("기존 게시글을 수정하는 컴포넌트", async () => {
    const component = customRender(<EditArticle />);

    await waitFor(() => {
      expect(
        component.getByRole("button", { name: "경기/인천" })
      ).toBeInTheDocument();

      expect(
        component.getByRole("button", { name: "가을" })
      ).toBeInTheDocument();

      expect(component.getByLabelText("키워드")).toBeInTheDocument();
      expect(component.getByText("카페")).toBeInTheDocument();
      expect(component.getByText("행궁")).toBeInTheDocument();
      expect(component.getByText("행궁 카페")).toBeInTheDocument();

      expect(component).toMatchSnapshot();
    });

    await waitFor(async () => {
      expect(await component.findByLabelText("코멘트")).toBeInTheDocument();
    });
  });
});
