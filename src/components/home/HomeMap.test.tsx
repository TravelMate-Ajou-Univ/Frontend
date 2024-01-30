import { composeStories } from "@storybook/react";
import * as stories from "./HomeMap.stories";
import { axiosMock } from "@/test/axios-mock";
import { articleCountMock } from "@/lib/mockData";
import { waitFor } from "@testing-library/react";
import customRender from "@/test/customRender";

const SEASON = "SPRING";

const { Default: HomeMap } = composeStories(stories);

beforeEach(() => {
  axiosMock
    .onGet("articles/count", { params: { period: SEASON } })
    .reply(200, articleCountMock);
});

afterEach(() => {
  axiosMock.reset();
});

describe("<HomeMap />", () => {
  it("지역별 게시글 수를 보여준다.", async () => {
    const component = customRender(<HomeMap />);

    await waitFor(() => {
      expect(component.getAllByText("3")).toHaveLength(2);
      expect(component.getAllByText("0")).toHaveLength(5);
      expect(component.getAllByText("1")).toHaveLength(1);
    });

    expect(component).toMatchSnapshot();
  });
});
