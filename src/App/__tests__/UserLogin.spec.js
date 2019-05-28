import React, { Fragment } from "react";
import { render, shallow, mount } from "enzyme";
import UserLogin from "../components/UserLogin";
import { Provider } from "react-redux";
import store from "../redux/store";

/**
 * Testing de 2 componentes de presentaciÃ³n
 */

/**
 * UserLogin
 */
describe('UserLogin', () => {

  describe("Render", () => {
      const wrapper = render(<Provider store={store}>
        <UserLogin location={ { state: { redirected: false } }}/>
        </Provider>
      );


      it('should match the following texts', () => {
      // Comprobamos el texto
      expect(wrapper.find('label[for="outlined-login"]').text()).toBe("Loginâ*");
      expect(wrapper.find('label[for="outlined-password-input"]').text()).toBe("Passwordâ*");

  
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot(); 
  });        
  });

  describe("Mount", () => {
    const wrapper = mount(<Provider store={store}>
      <UserLogin location={ { state: { redirected: false } }}/>
      </Provider>
    );

    it("should change class on empty fields", () => {
      const button = wrapper.find('button')

      button.simulate('click')
      expect(wrapper.find('div.Mui-error').length).toBe(2);

      });
});  






  });

 


