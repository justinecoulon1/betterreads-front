import AuthLightboxContent from '@/components/global/header/login/auth-lightbox/auth-lightbox-content';
import GenericLightbox from '@/components/generic/lightbox/lightbox';
import React from 'react';
import { LightboxTabs } from '@/components/global/header/login/auth-lightbox/lightbox-tabs';

export default function AuthLightbox({
  isLightboxOpened,
  closeLightbox,
  loginTab,
  setLoginTab,
  setRegisterTab,
}: {
  isLightboxOpened: boolean;
  closeLightbox: () => void;
  loginTab: LightboxTabs;
  setLoginTab: () => void;
  setRegisterTab: () => void;
}) {
  return (
    <GenericLightbox isLightboxOpened={isLightboxOpened} closeLightbox={closeLightbox}>
      <AuthLightboxContent
        loginTab={loginTab}
        setLoginTab={setLoginTab}
        setRegisterTab={setRegisterTab}
        onLoginSuccessful={closeLightbox}
        onRegisterSuccessful={setLoginTab}
      />
    </GenericLightbox>
  );
}
