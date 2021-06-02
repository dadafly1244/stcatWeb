import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn,  AmplifySignOut, AmplifyConfirmSignIn, AmplifyConfirmSignUp, AmplifyForgotPassword } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
//import GreetingsApp from './GreetingsApp'

Amplify.configure(awsconfig);

const AuthStateApp = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
        <div>Hello, {user.email}</div>
          <AmplifySignOut />  
      </div>
    ) : (
      <AmplifyAuthenticator>
        <AmplifySignIn
          headerText="STCAT에 로그인"
          slot="sign-in"
        />
        <AmplifyConfirmSignIn
          headerText="STCAT에 로그인 확인코드 입력"
          slot="confirm-sign-in"
        />
        <AmplifySignUp
          headerText="STCAT에 가입하기"
          slot="sign-up"
          formFields={[
            { type: "username" },
            { type: "password" },
            { type: "email" }
          ]}
        />

        <AmplifyConfirmSignUp
            headerText="STCAT 가입 확인코드 입력"
            slot="confirm-sign-up"
        />
        <AmplifyForgotPassword
          headerText="STCAT 비밀번호를 잊었나요?"
          slot="forgot-password"
        />
      </AmplifyAuthenticator>
  );
}

export default AuthStateApp;