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
  onLightboxOpened: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onLightboxClosed: (e: React.MouseEvent | React.KeyboardEvent) => void;
  loginTab: LoginTabs;
  onSetLoginTab: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onSetRegisterTab: (e: React.MouseEvent | React.KeyboardEvent) => void;
}) {
  return (
    <GenericLightbox isLightboxOpened={isLightboxOpened} onLightboxClosed={onLightboxClosed}>
      <AuthLightboxContent loginTab={loginTab} onSetLoginTab={onSetLoginTab} onSetRegisterTab={onSetRegisterTab} />
    </GenericLightbox>
  );
}
