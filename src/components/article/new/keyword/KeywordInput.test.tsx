import { composeStories } from "@storybook/react";
import * as stories from "./KeywordInput.stories";
import { axiosMock } from "@/test/axios-mock";
import { searchedKeywordMock } from "@/lib/mockData";
import customRender from "@/test/customRender";
import { fireEvent, waitFor } from "@testing-library/react";

const KEYWORD = "맛집";

const { Default: KeywordInput } = composeStories(stories);

beforeEach(() => {
  axiosMock.onGet(`tags/search/${KEYWORD}`).reply(200, searchedKeywordMock);
});

afterEach(() => {
  axiosMock.reset();
});

describe("<KeywordInput />", () => {
  it("키워드 입력 시 검색된 키워드를 보여준다.", async () => {
    const component = customRender(<KeywordInput />);

    const input = component.getByRole("textbox");
    fireEvent.change(input, { target: { value: KEYWORD } });

    await waitFor(() => {
      expect(component.getByRole("list")).toBeInTheDocument();

      expect(
        component.getByRole("listitem", {
          name(_, element) {
            return element.textContent === "제주 맛집";
          }
        })
      ).toBeInTheDocument();
      expect(
        component.getByRole("listitem", {
          name(_, element) {
            return element.textContent === "맛집";
          }
        })
      ).toBeInTheDocument();
    });

    expect(component).toMatchSnapshot();
  });
});
