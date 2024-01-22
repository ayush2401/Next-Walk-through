"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [submittinig, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    console.log(post, session?.user?.id);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post?.prompt,
          userId: session?.user?.id,
          tag: post?.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return <Form type="Create" post={post} setPost={setPost} submitting={submittinig} handleSubmit={createPrompt} />;
};

export default page;
