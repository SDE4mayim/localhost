import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';
import StarIcon from '@mui/icons-material/Star';
import DiamondIcon from '@mui/icons-material/Diamond';
import StarRateIcon from '@mui/icons-material/StarRate';

function Pricing() {
  const planList = [
    {
      value: "gold",
      label: "Gold",
      userlimit: "3",
      icon: <StarIcon fontSize='large' style={{ color: 'gold' }} />,
      description: "Ideal for small practices with 1 Hospital and up to 2 Doctors.",
      price: "Rs.2,000 per month",
      specialOffer: "Special Offer: 50% Discount on Yearly Plans. Pay Only Rs. 12,000 Annually (Originally Rs. 24,000)",
      link: "/gsignup"
    },
    {
      value: "diamond",
      label: "Diamond",
      userlimit: "12",
      icon: <DiamondIcon fontSize='large' style={{ color: '#b9f2ff' }} />,
      description: "Suitable for practices with 2 Hospitals and up to 10 Doctors.",
      price: "Rs.3,500 per month",
      specialOffer: "Special Offer: 50% Discount on Yearly Plans. Pay Only Rs. 21,000 Annually (Originally Rs. 42,000)",
      link: "/dsignup"
    },
    {
      value: "platinum",
      label: "Platinum",
      userlimit: "100",
      icon: <StarRateIcon fontSize='large' style={{ color: '#E5E4E2' }} />,
      description: "Perfect for large practices with Unlimited Hospitals and Doctors.",
      price: "Rs.7,000 per month",
      specialOffer: "Special Offer: 50% Discount on Yearly Plans. Pay Only Rs. 42,000 Annually (Originally Rs. 84,000)",
      link: "/psignup"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="grow">

        {/* Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome back. Following are the plans we have.</h1>
              </div>

              {/* Plans Section */}
              <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                  <div className="py-12 md:py-20">

                    {/* Plan Items */}
                    <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>
                      {planList.map((plan) => (
                        <div key={plan.value} className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
                          {plan.icon}
                          <h4 className="h4 mb-2">{plan.label}</h4>
                          <h4 className='h4 mb-2 text-center'>{plan.price}</h4>
                          <h5 className='h5 mb-2 text-red-600 text-center'>{plan.specialOffer}</h5>
                          <p className="text-lg text-gray-400 text-center mt-3">{plan.description}</p>
                          <Link to={plan.link} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-3">Sign up</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Pricing;
