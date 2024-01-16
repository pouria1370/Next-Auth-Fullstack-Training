'use client'

import Link from "next/link"
import { Button } from "../ui/button"

interface BackButtonProps {
    href: string,
    lable: string
}
export const BackButton = ({ href, lable }: BackButtonProps) => {
    return (
        <div>
            <Button
                asChild
                className="font-normal w-full"
                variant="link"
                size='sm'
            >
                <Link href={href}>
                    {lable}
                </Link>
            </Button>
        </div>
    )
}