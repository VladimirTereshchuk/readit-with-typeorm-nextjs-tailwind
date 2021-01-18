import { useEffect, useState } from "react";
import Axios from "axios";
import Head from "next/head";
import useSWR from "swr";
// import Link from "next/link";
import { PostCard } from "../components/PostCard";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

import { Post } from "../types";

// dayjs.extend(relativeTime);

export default function Home() {
  const { data: posts } = useSWR("/posts");

  return (
    <>
      <Head>
        <title>readit: the front page of the internet</title>
      </Head>
      <div className="container flex pt-4">
        {/* Post feed */}
        <div className="w-160">
          {posts?.map((post) => {
            return <PostCard post={post} key={post.identifier} />;
          })}
        </div>
        <div className="w-40">Sidebar</div>
      </div>
    </>
  );
}
