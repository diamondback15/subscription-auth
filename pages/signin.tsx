import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import LoadingDots from 'components/ui/LoadingDots';
import Logo from 'components/icons/Logo';
import { getURL } from '@/utils/helpers';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

const SignIn = () => {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (user) {
      router.replace('/account');
    }
  }, [user]);

  if (!user)
    return (
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
          <div className="flex justify-center pb-12 ">
            <Logo width="64px" height="64px" />
          </div>
          <div className="flex flex-col space-y-4">
            <Auth
              supabaseClient={supabaseClient}
              providers={['github', 'google']}
              redirectTo={getURL()}
              magicLink={true}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#404040',
                      brandAccent: '#52525b'
                    }
                  }
                },
                style: {
                  input: {
                    fontSize: '14px',
                    background: 'transparent',
                    borderColor: 'rgb(107 114 128 / var(--tw-bg-opacity))'
                  },
                  label: { fontSize: '12px', color: 'white' },
                  button: {
                    background: 'white',
                    color: 'black',
                    fontWeight: '500',
                    border: 0
                  },
                  divider: {
                    backgroundColor: 'rgb(107 114 128 / var(--tw-bg-opacity))'
                  }
                }
              }}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email Address',
                    email_input_placeholder: 'Email Address',
                    password_label: 'Password',
                    password_input_placeholder: 'Password'
                  },
                  sign_up: {
                    email_label: 'Email Address',
                    email_input_placeholder: 'Email Address',
                    password_label: 'New Password',
                    password_input_placeholder: 'New Password'
                  }
                }
              }}
              theme="dark"
            />
          </div>
        </div>
      </div>
    );

  return (
    <div className="m-6">
      <LoadingDots />
    </div>
  );
};

export default SignIn;
