import { AppComponent } from "./app.component";

describe('AppComponent', () => {

  // Testcase that mentioned with it()
  it('should component initialized', () => {
    const component = new AppComponent();
    expect(component).toBeTruthy();
  });


});