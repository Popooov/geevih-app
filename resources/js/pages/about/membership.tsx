import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Hero from '@/components/membership/membership-hero';
import Intro from '@/components/membership/membership-intro';
import Eligibility from '@/components/membership/membership-eligibility';
import Benefits from '@/components/membership/membership-benefits';
import Steps from '@/components/membership/membership-steps';
import Faq from '@/components/membership/membership-faq';
import FinalCta from '@/components/membership/membership-final-cta';

const typeformUrl = 'https://seisida.typeform.com/to/kZwwPgdK';

export default function Membership() {
    return (
        <AppLayout>
            <Head title="Hazte socio | GEEVIH" />

            <main className="bg-white text-slate-900">
                <Hero typeformUrl={typeformUrl} />
                <Intro />
                <Eligibility />
                <Benefits />
                <Steps typeformUrl={typeformUrl} />
                <Faq />
                <FinalCta typeformUrl={typeformUrl} />
            </main>
        </AppLayout>
    );
}
