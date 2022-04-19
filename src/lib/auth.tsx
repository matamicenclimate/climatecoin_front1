import storage from '@/utils/storage';
import { AuthProviderConfig, initReactQueryAuth } from 'react-query-auth';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { LoginCredentialsDTO } from '@/features/auth/api/login';
import { RegisterCredentialsDTO, registerWithEmailAndPassword } from '@/features/auth/api/register';
import { AuthUser, UserResponse } from '@/features/auth/types';
import { magiclink } from './magiclink';
import { getUser } from '@/features/auth/api/getUser';
import { httpClient } from '@/lib/httpClient';

async function handleUserResponse(data: UserResponse) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

async function loadUser(): Promise<AuthUser | null> {
  const isLoggedIn = await magiclink.user.isLoggedIn();

  if (isLoggedIn) {
    /* Get the DID for the user */
    const jwt = await magiclink.user.getIdToken();
    storage.setToken(jwt);

    /* Get user metadata including email */
    const userMetadata = await getUser();
    return userMetadata;
  }

  return null;
}

async function loginFn(data: LoginCredentialsDTO): Promise<AuthUser> {
  const redirectURI = `${window.location.origin}/auth/callback`; // 👈 This will be our callback URI

  const jwt = await magiclink.auth.loginWithMagicLink({ ...data, redirectURI });

  storage.setToken(jwt as string);

  const userMetadata = await getUser();

  const issuer = userMetadata.magic_user.issuer;
  const publicAddress = userMetadata.magic_user.publicAddress;

  const updateData = { issuer: issuer, publicAddress: publicAddress };
  httpClient.put(`/users/${userMetadata.id}`, updateData);

  return userMetadata;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);

  // TODO: fix this
  return user as unknown as AuthUser;
}

async function logoutFn() {
  await magiclink.user.logout();
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig: AuthProviderConfig<AuthUser | null, unknown> = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  },
  waitInitial: false,
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
