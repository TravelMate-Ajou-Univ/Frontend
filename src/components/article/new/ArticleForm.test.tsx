import { render, waitFor } from "@testing-library/react";
import * as stories from "./ArticleForm.stories";
import { composeStories } from "@storybook/react";
import MockAdapter from "axios-mock-adapter";
import { api } from "@/service/axios/api";
import { initialize } from "@googlemaps/jest-mocks";

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
  const axiosMock = new MockAdapter(api, { delayResponse: 200 });
  beforeEach(() => {
    initialize();
    axiosMock.onGet(`articles/1?userId=0`).reply(200, {
      id: 1,
      title: "",
      thumbnail: null,
      location: "경기/인천",
      authorId: 1,
      springVersionID: 1,
      summerVersionID: null,
      fallVersionID: null,
      winterVersionID: null,
      articleTagMap: [],
      spring: null,
      summer: {
        id: 1,
        articleId: 1,
        userId: 1,
        period: "SUMMER",
        content: "<p>hi</p>",
        createdAt: "2023-12-02T09:31:38.000Z",
        updatedAt: "2023-12-02T09:31:38.000Z"
      },
      fall: null,
      winter: null,
      articleBookmarkMap: [],
      isFavorite: false
    });
  });
  afterEach(() => {
    axiosMock.reset();
  });

  it("새로운 게시글을 작성하는 컴포넌트", async () => {
    const component = render(<NewArticle />);
    await waitFor(() => {
      expect(component).toMatchSnapshot();
    });
  });

  it("기존 게시글을 수정하는 컴포넌트", async () => {
    const component = render(<EditArticle />);

    await waitFor(() => {
      expect(component.getByText("경기/인천")).toBeInTheDocument();
      expect(component.getByText("가을")).toBeInTheDocument();
      expect(component).toMatchSnapshot();
    });

    await waitFor(async () => {
      expect(await component.findByLabelText("코멘트")).toBeInTheDocument();
    });
  });
});
