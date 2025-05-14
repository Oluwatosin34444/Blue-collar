import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Briefcase, CircleFadingArrowUp, ShieldPlus } from 'lucide-react'
import Container from '@/components/container'
import type { ReactNode } from 'react'

export default function Features() {
    return (
        <section className="bg-zinc-50 py-16 md:py-30 dark:bg-transparent">
            <Container>
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-bold mb-4 text-gray-900">Why Choose BlueCollar?</h2>
                    <p className="mt-4">We are a platform that connects customers with skilled artisans. We are a platform that connects customers with skilled artisans.</p>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 *:text-center md:mt-16">
                    <Card className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Briefcase
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Verified Professionals</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">All our artisans are verified and background-checked for your peace of mind.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <CircleFadingArrowUp
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Quality Guaranteed</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm">We ensure high-quality work through our rating and review system.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <ShieldPlus
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Secure Payments</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm">Safe and secure payment system with money-back guarantee.</p>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div
            aria-hidden
            className="bg-radial to-background absolute inset-0 from-transparent to-75%"
        />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)