import { Box, CircularProgress, Container } from "@mui/material";

import Head from "next/head";
import MessageForm from "/components/Message/MessageForm";
import React from "react";
import { createMessage } from "/queries/mutations";
import preprocessorMessage from "/components/Message/MessageForm/preprocessorMessage";
import setData from "/helpers/setData";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function MessageFormPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in");
    },
  });
  const mutation = useMutation(
    async (newFormData) => {
      await setData(createMessage, { data: newFormData });
    },
    {
      mutationKey: "createMessage",
      onSuccess: (data, variables) => {
        console.log("onSuccess", data, variables);
      },
    }
  );
  const handleSubmit = async (values) => {
    const modifiedValues = preprocessorMessage(values);
    await new Promise((r) => setTimeout(r, 500));

    mutation.mutate(
      { ...modifiedValues },
      {
        onSuccess: async (_res) => {
          router.push("/message");
        },
        onError: async (err, varia) => {
          console.log("onError", err, varia);
        },
      }
    );

    if (mutation.isError) {
      console.log("failed", mutation.error);
    }
    if (mutation.onSettled) {
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>;
    }
  };
  if (mutation.isSuccess) {
  }
  if (!session) return null;
  return (
    <>
      <Head>
        <title>CT Add Message</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Container maxWidth="lg" sx={{ height: "90vh", pt:4 }}>
        <MessageForm handleSubmit={handleSubmit} />
      </Container>
    </>
  );
}

export default MessageFormPage;
