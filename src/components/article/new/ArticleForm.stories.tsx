// import { HttpResponse, http } from "msw";
import { Provider } from "react-redux";
import ArticleForm, { Props } from "./ArticleForm";
import type { Meta, StoryFn } from "@storybook/react";
import { store } from "@/redux/store";
import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { sleep } from "@/service/sleep";

export default {
  title: "ArticleForm",
  component: ArticleForm,
  decorators: [
    (Story: StoryFn) => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ],
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
} as Meta<typeof ArticleForm>;

const Template: StoryFn<typeof ArticleForm> = (args: Props) => (
  <ArticleForm {...args} />
);

export const NewArticle = Template.bind({});
export const EditArticle = Template.bind({});

NewArticle.args = {
  edittingId: undefined,
  edittingSeason: undefined
};

NewArticle.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("지역에서 경기/인천을 선택한다.", async () => {
    await sleep(1000);
    const locationSelect = await canvas.findByRole("button", {
      name: "선택"
    });
    userEvent.click(locationSelect);
    await sleep(1000);
    const location = await canvas.findByText("경기/인천");
    userEvent.click(location);
  });

  await step("계절에서 겨울을 선택한다.", async () => {
    await sleep(1000);
    const seasonSelect = await canvas.findByRole("button", {
      name: "봄"
    });
    userEvent.click(seasonSelect);
    await sleep(1000);
    const season = await canvas.findByText("겨울");
    userEvent.click(season);
  });
};

EditArticle.args = {
  edittingId: "1",
  edittingSeason: "FALL"
};

EditArticle.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(async () => {
    await expect(await canvas.findByLabelText("코멘트")).toBeInTheDocument();
  });
};
