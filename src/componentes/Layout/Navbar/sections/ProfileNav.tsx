import clsx from 'clsx';
import { useAuth } from '@/lib/auth';
import Popover from '@/componentes/Popover/Popover';
import { ReactComponent as IconCog } from '@/assets/icons/bx-cog-line2.svg';
import { ReactComponent as IconLogout } from '@/assets/icons/bx-logout.svg';
import { ReactComponent as IconLock } from '@/assets/icons/bx-lock-line.svg';
import { ReactComponent as IconUser } from '@/assets/icons/bx-user-line.svg';
import { ReactComponent as IconShare } from '@/assets/icons/bx-share-square.svg';
import { ReactComponent as IconBrightness } from '@/assets/icons/bx-brightness-line.svg';
import { Switch } from '@/componentes/Form/Switch';
import { Form } from '@/componentes/Form/Form';
import { Switch as HLSwitch } from '@headlessui/react';
import { updateUserType } from '@/componentes/Layout/Navbar/api/updateUserType';
import { useState } from 'react';
import { Link } from '@/componentes/Elements/Link/Link';

export const ProfileNav = () => {
  const auth = useAuth();
  const updateType = updateUserType();

  const handleLogout = () => {
    auth.logout();
  };

  const profileOptions = [
    {
      name: 'Profile',
      icon: <IconUser className={'h-5 w-5'} />,
      href: '/profile',
      description: 'Manage your profile',
    },
    {
      name: 'Payment methods',
      href: '/payment-methods',
      icon: <IconShare className={'h-5 w-5'} />,
      description: 'Manage your payment methods',
    },
    {
      name: 'Security',
      icon: <IconLock className={'h-5 w-5'} />,
      href: '/security',
      description: 'Manage your account security',
    },
    {
      name: 'Configuration',
      icon: <IconCog className={'h-5 w-5'} />,
      href: '/configuration',
      description: 'Set up your account and alerts',
    },
  ];

  const [isDeveloper, setIsDeveloper] = useState(auth.user?.type === 'developer');

  const handleChange = async () => {
    if (!auth.user) return;
    if (updateType.isLoading) return;
    setIsDeveloper(!isDeveloper);
    const data = await updateType.mutateAsync({
      userId: auth.user?._id as string,
      type: auth.user?.type === 'developer' ? 'buyer' : 'developer',
    });
    setIsDeveloper(data.type === 'developer');
  };

  return (
    <div className="flex items-center">
      <Popover>
        <Popover.Button>
          <div className="flex">
            <button className="text-sm font-bold uppercase hover:bg-blue-100">
              <img
                className="h-10 w-10 rounded-full"
                alt="100x100"
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                data-holder-rendered="true"
              />
            </button>
          </div>
        </Popover.Button>
        <Popover.Panel>
          <div>
            <div className="w-64 text-sm text-neutral-4">
              {profileOptions.map((option, i) => (
                <Link key={option.name} to={option.href} className="no-underline">
                  <div key={i} className="border-b last:border-none">
                    <Popover.Option
                      icon={<div className={'pr-1'}>{option.icon}</div>}
                      description={option.description}
                      name={option.name}
                      isActive
                      onClick={() => undefined}
                    />
                  </div>
                </Link>
              ))}

              <div
                onClick={handleChange}
                role="button"
                tabIndex={0}
                className={clsx(
                  'flex items-center px-2 py-3 font-alt transition duration-150 ease-in-out hover:bg-blue-100'
                )}
              >
                <div className="pr-1">
                  <IconBrightness className={'h-5 w-5'} />
                </div>
                <div className="flex w-full items-center">
                  <div>
                    <p className={clsx('px-2 font-normal text-neutral-3')}>Promoter mode</p>
                    <p className={clsx('px-2 text-[10px] font-normal text-neutral-4')}>
                      Create your own credits
                    </p>
                  </div>
                  <div className="flex-grow" />
                  <div>
                    <HLSwitch.Group>
                      <div className="flex items-center">
                        <HLSwitch
                          checked={isDeveloper}
                          onChange={() => null}
                          className={`${
                            isDeveloper ? 'bg-blue-600' : 'bg-gray-200'
                          } relative inline-flex h-5 w-8 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              isDeveloper ? 'translate-x-4' : 'translate-x-1'
                            } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                          />
                        </HLSwitch>
                      </div>
                    </HLSwitch.Group>
                  </div>
                </div>
              </div>

              <div
                onClick={handleLogout}
                role="button"
                tabIndex={0}
                key={'logout'}
                className={clsx(
                  'flex items-center border-neutral-6 px-2 py-3 font-alt transition duration-150 ease-in-out hover:bg-blue-100'
                )}
              >
                <div className="pr-1">
                  <IconLogout className={'h-5 w-5'} />
                </div>
                <div className={clsx('px-2 font-normal text-neutral-3')}>Log out</div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
