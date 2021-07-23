import App from "@/App.vue";
import {shallowMount} from "@vue/test-utils";
describe("input-field.vue", () => {
	const wrapper = shallowMount(App);
	wrapper.vm.appenditem = jest.fn();
	wrapper.vm.additem = jest.fn();
	wrapper.vm.removeitem = jest.fn();
	it("renders", () => {
		expect(wrapper.exists()).toBe(true);
	});
	it("title is correct", () => {
		expect(wrapper.find("h1").text()).toBe("Inventory Manager")
	});
	it("disables the button unless both variables have data", () => {
		let submitbutton = wrapper.find(".submit");
		let field1 = wrapper.vm.$data.newitem;
		let field2 = wrapper.vm.$data.quantity;
		if (field1 !== "" && field2 >= 1) {
			expect(submitbutton.attributes("disabled")).toBe(undefined);
		} else {
			expect(submitbutton.attributes("disabled")).toBe("true");
		};
	});
	it("input field loads correctly", () => {
		wrapper.find(".submit").trigger("click");
		expect(wrapper.vm.$data.newitem).toBe("")
	});
	it("append button works", () => {
		wrapper.find(".submit").trigger("click");
		expect(wrapper.vm.appenditem).toBeCalled();
	});
	it("add button works", () => {
		wrapper.find(".add").trigger("click");
		expect(wrapper.vm.additem).toBeCalled();
	});
	it("remove button works", () => {
		wrapper.find(".remove").trigger("click");
		expect(wrapper.vm.removeitem).toBeCalled();
	});
})