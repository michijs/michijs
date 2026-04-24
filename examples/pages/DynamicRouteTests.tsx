import { createRouter, Title, useParams } from "@michijs/michijs";
import { urls } from "../routes";

// Nested dynamic routes under /users/:id
const [dynamicRoutesUrls, DynamicRoutesRouter] = createRouter(
  {
    profile: <UserProfile />,
  },
  urls["users/:id"],
);

function UserProfile() {
  // Reactively reads :id from the URL — re-renders when the param changes
  const params = useParams("/users/:id/profile");

  return (
    <>
      <h2>User Profile (general)</h2>
      <p>
        Route: <code>/users/:id/profile</code>
      </p>
      <p>
        Current user ID: <strong>{params.id}</strong>
      </p>
    </>
  );
}

const DynamicRouteTests = () => (
  <>
    <Title>Dynamic Route Tests</Title>
    <h1>Dynamic Route Tests</h1>
    <p>Demonstrates routing with similar dynamic paths.</p>
    <p>
      Try navigating to{" "}
      <a href={dynamicRoutesUrls.profile({ params: { id: "1" } })}>
        /users/1/profile
      </a>{" "}
      and then{" "}
      <a href={dynamicRoutesUrls.profile({ params: { id: "2" } })}>
        /users/2/profile
      </a>{" "}
      — the user ID updates reactively.
    </p>
    <DynamicRoutesRouter />
  </>
);

export default DynamicRouteTests;
