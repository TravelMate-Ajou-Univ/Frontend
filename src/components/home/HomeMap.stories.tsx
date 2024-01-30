import { Meta, StoryFn } from "@storybook/react";
import HomeMap from "./HomeMap";
import ReactQueryProvider from "@/context/ReactQueryProvider";

export default {
  title: "HomeMap",
  component: HomeMap,
  decorators: [
    (Story: StoryFn) => (
      <ReactQueryProvider>
        <Story />
      </ReactQueryProvider>
    )
  ]
} as Meta<typeof HomeMap>;

const Template: StoryFn<typeof HomeMap> = () => <HomeMap />;

export const Default = Template.bind({});
