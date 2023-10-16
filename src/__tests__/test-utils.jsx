import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import { ThemeProvider } from "@/utils/contexts/theme";

const Providers = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>{children}</ThemeProvider>
    </BrowserRouter>
  );
};

const customRender = (component) => {
  return render(component, {
    wrapper: Providers,
  });
};

export * from "@testing-library/react";
export { customRender as render };
