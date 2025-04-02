import AuthLightboxContent from '@/components/global/header/login/auth-lightbox-content';
import GenericLightbox from '@/components/generic/lightbox/lightbox';
import React from 'react';
import { LoginTabs } from '@/components/global/header/login/login-tabs';

export default function AuthLightbox({
  isLightboxOpened,
  onLightboxClosed,
  loginTab,
  onSetLoginTab,
  onSetRegisterTab,
}: {
  isLightboxOpened: boolean;
  onLightboxClosed: () => void;
  loginTab: LoginTabs;
  onSetLoginTab: () => void;
  onSetRegisterTab: () => void;
}) {
  return (
    <GenericLightbox isLightboxOpened={isLightboxOpened} onLightboxClosed={onLightboxClosed}>
      <AuthLightboxContent
        loginTab={loginTab}
        onSetLoginTab={onSetLoginTab}
        onSetRegisterTab={onSetRegisterTab}
        onLightboxClosed={onLightboxClosed}
      />
    </GenericLightbox>
  );
}
