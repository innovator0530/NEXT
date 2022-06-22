import Image from "next/image"
import {
    BrandImageContainer,
    NavContainer,
    NavList,
    NavItem,
    ActionButton
}
from "../../AppHeader/AppHeader_style"
import Link from "next/link"
import {useRouter} from "next/router"
import { GlobalAppConfig } from "../../../models/database/config"

const adminRoutes = [
    {href:"/admin/users/new", name:"User Database"},
    {href:"/admin/moderation/releases", name:"Moderation"},
    {href:"/admin/earnings/payout-requests", name:"Earnings"},
    {href:"/app/settings", name:"Settings"},
]

const defaultAppConfig:GlobalAppConfig = {
    loginEnabled: true,
    signupEnabled:true,
    newReleasesEnabled: true
}

function AppHeader({theme,label,userContext=false, appConfig=defaultAppConfig, disabled=false}) {

    const userRoutes = [
        {href:"/app/dashboard", name:"Dashboard"},
        {href:"/app/releases", name:"Releases"},
        {href:"/app/royalty", name:"Royalty Statements"},
        {href:"/app/settings", name:"Settings"},
    ]
    
    const router = useRouter()
    let routes = label === 'admin' ? adminRoutes : userRoutes;
    const pathPrefix = router.pathname.split('/').slice(0,3).join('/');
    
    if(userContext){
        if(routes.some(r=>r.href==='/app/settings'))
        routes = routes.filter(r=>r.href!=='/app/settings');
    }
    if(disabled&& !userContext){
        routes = []
    }

    return (
        <NavContainer theme={theme}>
            <BrandImageContainer >
                <Image  src={theme.name==='dark'?"/rewave.svg":"/rewave_black.svg"} height="23" width="141"/>
                <span>{label}</span>
            </BrandImageContainer>
            <NavList>
                {
                    routes.map(r=>(
                        r.href?<Link key={r.href} href={r.href}><NavItem active={pathPrefix === r.href.split('/').slice(0,3).join('/')}>{r.name}</NavItem></Link>:<NavItem>{r.name}</NavItem>
                    ))
                }                
            </NavList>
            {!(disabled&& !userContext)&&<Link href={appConfig.newReleasesEnabled===false?'#':"/app/releases/create"}><ActionButton disabled={appConfig.newReleasesEnabled===false}>{appConfig.newReleasesEnabled===false?'Creating Releases is disabled':'Create Release'}</ActionButton></Link>}
        </NavContainer>
    )
}

export default AppHeader
