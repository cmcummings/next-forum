import TextLink from "../generic/TextLink"

export default function AuthorLink({ id, name }: { id: number, name: string }) {
  return <TextLink href={"/u/" + id}>{name}</TextLink>
}