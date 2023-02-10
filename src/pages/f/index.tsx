import { GetServerSideProps, GetServerSidePropsContext } from "next"


export default function ForumIndex() {
  return <></>
}


export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    redirect: '/',
    props: {}
  }
}