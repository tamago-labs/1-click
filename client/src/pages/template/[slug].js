
import MainLayout from "@/layouts/mainLayout";
// import TEMPLATES from "@/data/templates"; 
import TemplateDetailsContainer from "@/containers/templateDetails";
import axios from "axios"
import { API_HOST } from "@/constants";

export default function Home({ slug, data }) {
    return (
        <MainLayout>
            <TemplateDetailsContainer
                slug={slug}
                data={data}
            />
        </MainLayout>
    )
}

export const getStaticPaths = async () => {
    const { data } = await axios.get(`${API_HOST}/templates`)
 
    return { paths: data.map(item => ({ params: { slug: item.slug } })), fallback: "blocking" };
}

export async function getStaticProps(context) {

    const { params } = context

    const { slug } = params

    const { data } = await axios.get(`${API_HOST}/templates`)

    return {
        props: {
            slug,
            data: data.find( i => i.slug === slug)
        }
    };
}