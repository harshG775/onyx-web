"use client";
import { envClient } from "@/lib/env/client.env";
import { DiscussionEmbed, CommentCount } from "disqus-react";

const disqusShortName = "onyxstream";
const { NEXT_PUBLIC_SITEBASEURL } = envClient;
type DisqusAnimeProps = {
    url: string;
    title: string;
    id: string;
};
export function DisqusAnime({ url, id, title }: DisqusAnimeProps) {
    const disqusConfig = {
        url: `${NEXT_PUBLIC_SITEBASEURL}/${url}`,
        identifier: id,
        title: title,
        language: "en_US",
    };
    return (
        <>
            <DiscussionEmbed
                shortname={disqusShortName}
                config={disqusConfig}
            />
        </>
    );
}
