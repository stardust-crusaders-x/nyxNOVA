import { createClient } from '@/prismicio';



export default async function Header(){

    const client = createClient();

    const settings = await client.getSingle("settings");
    return(
        <header>{settings.data.site_title}</header>
    )
}