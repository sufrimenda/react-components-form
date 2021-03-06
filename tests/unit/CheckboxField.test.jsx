import '../enzymeConfig';
import React from 'react';
import { mount } from 'enzyme';
import {CheckboxField} from '../../src/components/CheckboxField';

describe('CheckboxField', () => {
    let onChangeData = jest.fn();
    let props = {};
    beforeEach(() => {
        onChangeData = jest.fn();
        props = {
            name: 'firstName',
            label: 'first name',
            onChange: onChangeData,
            hasValidationError: true,
            validationErrors: ['testError'],
            errorsStyles: {
                className: 'errorClassName'
            },
            className: 'testComponent'
        };
    });

    it('should call onChange method on change event', () => {
        const wrapper = mount(<CheckboxField {...props} />);
        wrapper.find('input').simulate('change');
        expect(onChangeData).toBeCalled();
    });

    it('should return true if checked and false if not checked', () => {
        const wrapper = mount(<CheckboxField {...props} />);
        wrapper.find('input').simulate('change');
        expect(onChangeData).toBeCalledWith(true);
        wrapper.find('input').simulate('change');
        expect(onChangeData).toBeCalledWith(false);
    });

    it('should checked field if component will receive new props with value true', () => {
        const wrapper = mount(<CheckboxField {...props} />);
        wrapper.setProps({value: true});
        wrapper.find('input').simulate('change');
        expect(onChangeData).toBeCalledWith(false);
    });

    it('should return object if checked and undefined if not checked', () => {
        props.checkboxValue = { test: 'test' };
        props.type = Object;
        const wrapper = mount(<CheckboxField {...props} />);
        wrapper.find('input').simulate('change');
        expect(onChangeData).toBeCalledWith(props.checkboxValue);
        wrapper.find('input').simulate('change');
        expect(onChangeData).toBeCalledWith(undefined);
    });
});