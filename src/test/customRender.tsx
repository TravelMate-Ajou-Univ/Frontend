import ReactQueryProvider from "@/context/ReactQueryProvider";
import { RenderOptions, render } from "@testing-library/react";
import { ReactElement } from "react";

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, {
    wrapper: ({ children }) => (
      <ReactQueryProvider>{children}</ReactQueryProvider>
    ),
    ...options
  });

export default customRender;
