import { Meta, StoryFn } from "@storybook/react";
import KeywordInput, { Props } from "./KeywordInput";
import ReactQueryProvider from "@/context/ReactQueryProvider";

export default {
  title: "KeywordInput",
  component: KeywordInput,
  decorators: [
    (Story: StoryFn) => (
      <ReactQueryProvider>
        <Story />
      </ReactQueryProvider>
    )
  ]
} as Meta<typeof KeywordInput>;

const Template: StoryFn<typeof KeywordInput> = (args: Props) => (
  <KeywordInput {...args} />
);

export const Default = Template.bind({});

Default.args = {
  inputId: "keywordInput",
  addKeyword: (keyword: string) => {
    console.log(keyword);
  }
};
