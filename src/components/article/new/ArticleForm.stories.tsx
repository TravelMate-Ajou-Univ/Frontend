import { Provider } from "react-redux";
import ArticleForm, { Props } from "./ArticleForm";
import type { Meta, StoryFn } from "@storybook/react";
import { store } from "@/redux/store";

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
NewArticle.args = {
  edittingId: undefined,
  edittingSeason: undefined
};

export const EditArticle = Template.bind({});
EditArticle.args = {
  edittingId: "1",
  edittingSeason: "FALL"
};
