import { getLogtoContext, signIn, signOut } from "@logto/next/server-actions";
import SignOut from "./auth/signout";
import SignIn from "./auth/signin";
import { logtoConfig } from "@/lib/logto";

const Home = async () => {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  return (
    <nav>
      {isAuthenticated ? (
        <p>
          Hello, {claims?.sub},
          <SignOut
            onSignOut={async () => {
              "use server";

              await signOut(logtoConfig);
            }}
          />
        </p>
      ) : (
        <p>
          <SignIn
            onSignIn={async () => {
              "use server";

              await signIn(logtoConfig);
            }}
          />
        </p>
      )}
    </nav>
  );
};

export default Home;
