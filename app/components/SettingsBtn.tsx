import Link from 'next/link'
import { AdjustmentsVerticalIcon } from '@heroicons/react/20/solid'

export default function SettingsBtn() {
    return (
        <Link href={"/parametres"} style={{width: '36px', minWidth: '36px', height: '36px'}} className="c-grey p-8 br-24">
            <AdjustmentsVerticalIcon/>
        </Link>
    )
}