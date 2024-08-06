import React from 'react';

import FeatureIcon1 from '../images/features-03-image-01.png';
import FeatureIcon2 from '../images/features-03-image-02.png';
import FeatureIcon3 from '../images/features-03-image-03.png';

function FeaturesZigzag() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4">Unlock Unlimited Solutions</div>
            <h1 className="h2 mb-4">Empower Your Veterinary Practice</h1>
            <p className="text-xl text-gray-400">Meet all your veterinary needs with Vet Castle.</p>
          </div>

          {/* Items */}
          <div className="grid gap-20">

            {/* 1st item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={FeatureIcon1} width="540" height="405" alt="Appointment Schedule" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">Efficiency Redefined</div>
                  <h3 className="h3 mb-3">Appointment Schedule</h3>
                  <p className="text-xl text-gray-400 mb-4">Effortlessly manage appointments with a user-friendly interface.</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    <li className="flex items-center mb-2">
                      <img className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" src={FeatureIcon1} alt="Checkmark" />
                      <span>Streamline your scheduling process</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <img className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" src={FeatureIcon1} alt="Checkmark" />
                      <span>Automate appointment reminders</span>
                    </li>
                    <li className="flex items-center">
                      <img className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" src={FeatureIcon1} alt="Checkmark" />
                      <span>Enhance communication with clients</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={FeatureIcon2} width="540" height="405" alt="Prescription Management" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">Enhance Patient Care</div>
                  <h3 className="h3 mb-3">Prescription Management</h3>
                  <p className="text-xl text-gray-400 mb-4">Streamline prescription management for better patient care.</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    <li className="flex items-center mb-2">
                      <img className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" src={FeatureIcon2} alt="Checkmark" />
                      <span>Efficiently manage prescriptions</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <img className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" src={FeatureIcon2} alt="Checkmark" />
                      <span>Ensure accurate medication records</span>
                    </li>
                    <li className="flex items-center">
                      <img className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" src={FeatureIcon2} alt="Checkmark" />
                      <span>Improve collaboration among staff</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={FeatureIcon3} width="540" height="405" alt="Reports" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">Informed Decision-Making</div>
                  <h3 className="h3 mb-3">Reports</h3>
                  <p className="text-xl text-gray-400 mb-4">Access insightful reports to make informed decisions.</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    <li className="flex items-center mb-2">
                      <img className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" src={FeatureIcon3} alt="Checkmark" />
                      <span>Generate detailed reports on clients and pets</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <img className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" src={FeatureIcon3} alt="Checkmark" />
                      <span>Analyze data on a day/month/year-wise basis</span>
                    </li>
                    <li className="flex items-center">
                      <img className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" src={FeatureIcon3} alt="Checkmark" />
                      <span>Customize reports for different views</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesZigzag;
