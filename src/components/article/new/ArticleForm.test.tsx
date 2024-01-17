import { render, waitFor } from "@testing-library/react";
import * as stories from "./ArticleForm.stories";
import { composeStories } from "@storybook/react";
import MockAdapter from "axios-mock-adapter";
import { api } from "@/service/axios/api";
import { initialize } from "@googlemaps/jest-mocks";
import { articleMock } from "@/lib/mockData";

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

const axiosMock = new MockAdapter(api, { delayResponse: 200 });

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
    const component = render(<NewArticle />);
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
    const component = render(<EditArticle />);

    await waitFor(() => {
      expect(
        component.getByRole("button", { name: "경기/인천" })
      ).toBeInTheDocument();

      expect(
        component.getByRole("button", { name: "가을" })
      ).toBeInTheDocument();

      expect(component.getByLabelText("키워드")).toBeInTheDocument();

      expect(component).toMatchSnapshot();
    });

    await waitFor(async () => {
      expect(await component.findByLabelText("코멘트")).toBeInTheDocument();
    });
  });
});
