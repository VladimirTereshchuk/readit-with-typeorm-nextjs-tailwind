import Axios from "axios";
import Head from "next/head";
// import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { PostCard } from "../components/PostCard";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

// import { Post } from "../types";

// dayjs.extend(relativeTime);

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    Axios.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="pt-12">
      <Head>
        <title>readit: the front page of the internet</title>
      </Head>
      <div className="container flex pt-4">
        {/* Post feed */}
        <div className="w-160">
          {posts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })}
        </div>
        <div className="w-40">Sidebar</div>
      </div>
    </div>
  );
}
