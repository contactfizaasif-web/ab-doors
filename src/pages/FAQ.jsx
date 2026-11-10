import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FaqList from '@/components/home/FaqList';

export default function FAQ() {
  return (
    <>
      <section className="bg-white">
        <div className="shell grid gap-10 pb-16 pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:pb-20 lg:pt-14">
          <div className="self-start lg:sticky lg:top-[104px]">
            <p className="eyebrow">Need to know more?</p>
            <h1 className="mt-4 text-[30px] font-semibold leading-[1.1] text-espresso sm:text-[38px] lg:text-[44px]">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-clay">
              Common questions about our doors, custom orders, pricing and delivery in Lahore.
            </p>
            <p className="mt-6 hidden text-[11px] uppercase tracking-[0.16em] text-bronze lg:block">
              Scroll the questions
            </p>
          </div>

          <div className="lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto lg:pr-4">
            <FaqList />
          </div>
        </div>
      </section>

      <section className="bg-espresso py-14 text-ivory">
        <div className="shell flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-[22px] font-semibold sm:text-[26px]">Still have a question?</h2>
            <p className="mt-2 text-[14px] text-ivory/65">Our team can confirm details for the specific door you need.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="btn btn-ghost-light px-6">Contact Us</Link>
            <Link to="/custom-door" className="btn btn-light px-6">
              Custom Door <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}