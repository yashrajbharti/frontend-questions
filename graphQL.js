import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);
}

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
    }
  }
`;

const NEW_USER_SUBSCRIPTION = gql`
  subscription {
    newUser {
      id
      name
    }
  }
`;

const { data } = useSubscription(NEW_USER_SUBSCRIPTION);

if (data) {
  console.log("New user added:", data.newUser);
}
