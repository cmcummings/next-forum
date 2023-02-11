import { Thread } from "@/types/app-types";
import { BarsArrowDownIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"
import { useState } from "react";
import IconButton from "../generic/IconButton";
import TextLink from "../generic/TextLink";
import Container from "../generic/Container";
import AuthorLink from "./AuthorLink";
import Link from "next/link";

export default function ThreadPreview({ id, title, posts, link }: Thread & { link: string }) {
  if (!posts) {
    return <div>Failed to load</div>
  }

  const op = posts[0]
  const time = new Date(op.timestampPosted)

  const [expanded, setExpanded] = useState(false);

  
  return (
    <Container className="p-3 bg-slate-900 hover:border-slate-500">
      <div className="flex justify-between content-center items-center">
        <div className="flex flex-1 self-start min-w-0 items-center">
          <IconButton className="inline" onClick={() => setExpanded(ex => !ex)}>
            <BarsArrowDownIcon className="h-5 w-5"/>
          </IconButton> 
          <h3 className="ml-1 inline text-xl truncate"><Link href={link}>{title}</Link></h3>
        </div>
        <p className="flex-none self-end text-slate-400"><AuthorLink {...op.author} /> | {time.toDateString()}</p>
      </div>
      {expanded 
        ? <>
            <p className="text-slate-200 break-words">{op.content}</p>
            <TextLink href={link}>View full thread <ArrowLongRightIcon className="inline h-5 w-5" /></TextLink>
          </>
        : <></>}
    </Container>
  )
}