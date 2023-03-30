import { render, screen } from '@testing-library/react';

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import i18n from "i18next";

import Cookies from "js-cookie";
import { useRouter } from "next/router";


describe('Navbar', () => {
  it('changes language to English when button is clicked', () => {
    const wrapper = <Navbar />;
    const button = wrapper.find('#english-button');

    button.simulate('click');

    expect(wrapper.state('language')).toEqual('english');
  });

  it('changes language to French when button is clicked', () => {
    const wrapper = <Navbar />;
    const button = wrapper.find('#french-button');

    button.simulate('click');

    expect(wrapper.state('language')).toEqual('french');
  });

  it('does not change language if an invalid language is provided', () => {
    const wrapper = <Navbar />;
    const button = wrapper.find('#invalid-button');

    button.simulate('click');

    expect(wrapper.state('language')).toEqual('english');
  });
});
